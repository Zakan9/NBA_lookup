import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Player } from './schemas/players.schema';
import { Model } from 'mongoose';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { IPlayer } from './interfaces/player.interface';

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

  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const createdPlayer = await this.playerModel.create(createPlayerDto);
    return createdPlayer;
  }

  async deletePlayer(id: string): Promise<void> {
    await this.playerModel.findOneAndDelete({ _id: id });
  }

  async updatePlayer(id: string, updatePlayerDto: UpdatePlayerDto) {
    return this.playerModel.findOneAndUpdate({ _id: id }, updatePlayerDto, {
      new: true,
    });
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

    return response.data.data;
  }
}
