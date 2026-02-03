import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Player } from './interfaces/player.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PlayersService {
  constructor(private configService: ConfigService) {}

  getApiKey() {
    return this.configService.get<string>('API_KEY');
  }

  getBaseUrl() {
    return this.configService.get<string>('BASE_URL');
  }

  async getPlayers(): Promise<Player[]> {
    const response = await axios.get<{ data: Player[] }>(
      `${this.getBaseUrl()}/players`,
      {
        headers: {
          Authorization: this.getApiKey(),
        },
      },
    );

    return response.data.data;
  }
}
