import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Player } from './interfaces/player.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PlayersService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.getOrThrow<string>('API_KEY');
    this.baseUrl = this.configService.getOrThrow<string>('BASE_URL');
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
