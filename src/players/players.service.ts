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
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants.utils';
import { PlayersFilterDto } from './dto/players-filter.dto';
import { getByCountry } from 'countries-ts';

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
    return this.playerModel.findOneAndUpdate({ _id: id }, updatePlayerDto, {
      new: true,
    });
  }

  async upsertExternalPlayer(player: IPlayer): Promise<void> {
    const mappedPlayer = {
      externalId: player.id,
      first_name: player.first_name,
      last_name: player.last_name,
      position: player.position,
      height: player.height,
      weight: player.weight,
      jersey_number: player.jersey_number,
      college: player.college,
      country: player.country,
      draft_year: player.draft_year,
      draft_round: player.draft_round,
      draft_number: player.draft_number,
    };

    await this.playerModel.updateOne(
      { externalId: player.id },
      { $set: mappedPlayer },
      { upsert: true },
    );
  }

  async getPlayersFromDatabase(
    playersFilterDto: PlayersFilterDto,
  ): Promise<Player[]> {
    const query: QueryFilter<Player> = {};

    if (playersFilterDto.first_name) {
      query.first_name = { $regex: playersFilterDto.first_name, $options: 'i' };
    }

    if (playersFilterDto.last_name) {
      query.last_name = { $regex: playersFilterDto.last_name, $options: 'i' };
    }

    if (playersFilterDto.country) {
      query.country = playersFilterDto.country;
    }

    if (playersFilterDto.position) {
      query.position = playersFilterDto.position;
    }

    if (playersFilterDto.draft_number !== undefined) {
      query.draft_number = playersFilterDto.draft_number;
    }

    const limit = playersFilterDto.limit ?? DEFAULT_PAGE_SIZE;
    const page = playersFilterDto.page ?? 1;

    const skip = (page - 1) * limit;

    const playersFromDatabase = await this.playerModel
      .find(query)
      .skip(skip)
      .limit(playersFilterDto.limit ?? DEFAULT_PAGE_SIZE)
      .exec();
    return playersFromDatabase;
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

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const players = response.data.data.map(({ team, country, ...rest }) => {
          let countryValue = '';

          if (country) {
            const countryData = getByCountry(country);
            countryValue = countryData?.code || country;
          }

          return {
            ...rest,
            country: countryValue,
          };
        });

        console.log(players);
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
          console.log(`Rate limited. Waiting 60 seconds...`);
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
