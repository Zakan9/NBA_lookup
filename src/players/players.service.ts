import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Player } from './schemas/players.schema';
import { Model } from 'mongoose';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { IPlayer } from './interfaces/player.interface';
import { Cron, CronExpression } from '@nestjs/schedule';

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

  async getPlayers(): Promise<IPlayer[]> {
    const response = await axios.get<{ data: IPlayer[] }>(
      `${this.baseUrl}/players`,
      {
        headers: {
          Authorization: this.apiKey,
        },
      },
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return response.data.data.map(({ team, ...rest }) => rest);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async upsertPlayersToDatabase(): Promise<void> {
    this.logger.log('Cron job starting (upsertPlayersToDatabase)');
    try {
      const players = await this.getPlayers();

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
