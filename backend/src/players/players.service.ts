import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Player } from './schemas/players.schema';
import { Model, QueryFilter } from 'mongoose';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { IPlayer } from './interfaces/player.interface';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IPlayersResponse } from './interfaces/players-response.interface';
import { DEFAULT_PAGE_SIZE } from '../utils/constants.utils';
import { PlayersFilterDto } from './dto/players-filter.dto';
import { getByCountry } from 'countries-ts';
import { convertLbsToKg } from './utility/convert-lbs-to-kg.utility';
import { convertFeetAndInchesToCm } from './utility/convert-feet-and-inches-to-cm.utility';

@Injectable()
export class PlayersService {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly logger = new Logger(PlayersService.name);

  constructor(
    private configService: ConfigService,
    @InjectModel(Player.name) private playerModel: Model<Player>,
  ) {
    this.apiKey = this.configService.getOrThrow<string>('API_KEY');
    this.baseUrl = this.configService.getOrThrow<string>('BASE_URL');
  }

  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const createdPlayer = await this.playerModel.create(createPlayerDto);
    return createdPlayer;
  }

  async deletePlayer(id: string): Promise<void> {
    await this.playerModel.findOneAndDelete({ _id: id });
  }

  async deleteAllPlayers(): Promise<void> {
    await this.playerModel.deleteMany({});
  }

  async updatePlayer(id: string, updatePlayerDto: UpdatePlayerDto) {
    return this.playerModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      updatePlayerDto,
      {
        new: true,
      },
    );
  }

  async upsertExternalPlayer(player: IPlayer): Promise<void> {
    const mappedPlayer = {
      externalId: player.externalId,
      firstName: player.firstName,
      lastName: player.lastName,
      position: player.position,
      height: player.height,
      weight: player.weight,
      jerseyNumber: player.jerseyNumber,
      college: player.college,
      country: player.country,
      draftYear: player.draftYear,
      draftRound: player.draftRound,
      draftNumber: player.draftNumber,
      team: player.team,
    };

    await this.playerModel.updateOne(
      { externalId: player.externalId, isDeleted: false },
      { $set: mappedPlayer },
      { upsert: true },
    );
  }

  async getPlayerById(id: string): Promise<Player | null> {
    return this.playerModel.findOne({ _id: id, isDeleted: false }).exec();
  }

  async getPlayersFromDatabase(playersFilterDto: PlayersFilterDto): Promise<{
    data: Player[];
    meta: {
      totalCount: number;
      totalPages: number;
      currentPage: number;
      perPage: number;
    };
  }> {
    const query: QueryFilter<Player> = { isDeleted: false };

    if (playersFilterDto.firstName) {
      query.firstName = { $regex: playersFilterDto.firstName, $options: 'i' };
    }

    if (playersFilterDto.lastName) {
      query.lastName = { $regex: playersFilterDto.lastName, $options: 'i' };
    }

    if (playersFilterDto.country) {
      query.country = playersFilterDto.country;
    }

    if (playersFilterDto.position) {
      query.position = playersFilterDto.position;
    }

    if (playersFilterDto.draftNumber !== undefined) {
      query.draftNumber = playersFilterDto.draftNumber;
    }

    if (
      playersFilterDto.minHeight !== undefined ||
      playersFilterDto.maxHeight !== undefined
    ) {
      query.height = {};
      if (playersFilterDto.minHeight !== undefined)
        query.height.$gte = playersFilterDto.minHeight;
      if (playersFilterDto.maxHeight !== undefined)
        query.height.$lte = playersFilterDto.maxHeight;
    }

    if (
      playersFilterDto.minWeight !== undefined ||
      playersFilterDto.maxWeight !== undefined
    ) {
      query.weight = {};
      if (playersFilterDto.minWeight !== undefined)
        query.weight.$gte = playersFilterDto.minWeight;
      if (playersFilterDto.maxWeight !== undefined)
        query.weight.$lte = playersFilterDto.maxWeight;
    }

    const limit = playersFilterDto.limit ?? DEFAULT_PAGE_SIZE;
    const page = playersFilterDto.page ?? 1;
    const skip = (page - 1) * limit;

    const [players, totalCount] = await Promise.all([
      this.playerModel.find(query).skip(skip).limit(limit).exec(),
      this.playerModel.countDocuments(query),
    ]);

    return {
      data: players,
      meta: {
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
        perPage: limit,
      },
    };
  }

  async getPlayersFromApi(): Promise<IPlayer[]> {
    let nextCursor: number | null = null;
    const allPlayers: IPlayer[] = [];

    do {
      try {
        const response = await axios.get<IPlayersResponse>(
          nextCursor !== null
            ? `${this.baseUrl}/players?per_page=100&cursor=${nextCursor}`
            : `${this.baseUrl}/players?per_page=100`,
          {
            headers: {
              Authorization: this.apiKey,
            },
          },
        );
        const data: IPlayersResponse = response.data;

        const players = response.data.data.map(
          ({
            id,
            first_name,
            last_name,
            position,
            height,
            weight,
            jersey_number,
            college,
            country,
            draft_year,
            draft_round,
            draft_number,
            team,
          }) => {
            let countryValue = '';
            let tempPosition: string[] = [];
            let tempWeight: number | null = null;
            let tempHeight: number | null = null;

            if (country !== '') {
              const countryData = getByCountry(country);
              countryValue = countryData?.code || country;
            }

            if (position !== '') {
              if (position.length > 1) {
                const parts = position.split('-');
                tempPosition = parts;
              } else {
                tempPosition[0] = position[0];
              }
            }

            if (typeof weight === 'string') {
              tempWeight = convertLbsToKg(weight);
            }

            if (typeof height === 'string') {
              tempHeight = convertFeetAndInchesToCm(height);
            }

            return {
              externalId: id,
              firstName: first_name,
              lastName: last_name,
              position: tempPosition,
              height: tempHeight,
              weight: tempWeight,
              jerseyNumber: jersey_number,
              college: college,
              country: countryValue,
              draftYear: draft_year,
              draftRound: draft_round,
              draftNumber: draft_number,
              team: {
                id: team.id,
                conference: team.conference,
                division: team.division,
                city: team.city,
                name: team.name,
                fullName: team.full_name,
                abbreviation: team.abbreviation,
              },
            };
          },
        );
        allPlayers.push(...players);

        nextCursor = data.meta.next_cursor;
        if (typeof nextCursor !== 'number' || isNaN(nextCursor)) {
          nextCursor = null;
        }

        if (nextCursor !== null) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 429) {
          await new Promise((resolve) => setTimeout(resolve, 60000));
          continue;
        }
        throw error;
      }
    } while (nextCursor !== null);

    return allPlayers;
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async upsertPlayersToDatabase(): Promise<void> {
    this.logger.log('Cron job starting (upsertPlayersToDatabase)');
    try {
      const players = await this.getPlayersFromApi();
      this.logger.log(`Fetched ${players.length} players from API`);

      for (const player of players) {
        await this.upsertExternalPlayer(player);
      }

      this.logger.log('Cron job finished successfully');
    } catch (error) {
      this.logger.error(
        `Cron job failed (upsertPlayersToDatabase).\nError: ${error}`,
      );
    }
  }
}
