import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Player } from './interfaces/player.interface';

const API_KEY = '';
const BASE_URL = 'https://api.balldontlie.io/v1';

@Injectable()
export class PlayersService {
  async getPlayers(): Promise<Player[]> {
    const response = await axios.get<{ data: Player[] }>(
      `${BASE_URL}/players`,
      {
        headers: {
          Authorization: API_KEY,
        },
      },
    );

    return response.data.data;
  }
}
