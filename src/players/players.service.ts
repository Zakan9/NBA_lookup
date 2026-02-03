import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Player } from './schemas/players.schema';
import { Model } from 'mongoose';
import { CreatePlayerDto } from './dto/CreatePlayer.dto';

@Injectable()
export class PlayersService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(
    private configService: ConfigService,
    @InjectModel(Player.name) private playerModel: Model<Player>,
  ) {
    this.apiKey = this.configService.getOrThrow<string>('API_KEY');
    this.baseUrl = this.configService.getOrThrow<string>('BASE_URL');
  }

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const createdPlayer = await this.playerModel.create(createPlayerDto);
    return createdPlayer;
  }

  async getPlayers(): Promise<Player[]> {
    const response = await axios.get<{ data: Player[] }>(
      `${this.baseUrl}/players`,
      {
        headers: {
          Authorization: this.apiKey,
        },
      },
    );

    return response.data.data;
  }
}
