import { IPlayer } from './player.interface';

export interface IPlayersResponse {
  data: IPlayer[];
  meta: {
    next_cursor: number | null;
    per_page: number;
  };
}
