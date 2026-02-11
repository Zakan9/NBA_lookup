import { IPlayer } from './player.interface';

type IPlayerString = Omit<IPlayer, 'weight' | 'height' | 'position'> & {
  weight: string;
  height: string;
  position: string;
};

export interface IPlayersResponse {
  data: IPlayerString[];
  meta: {
    next_cursor: number | null;
    per_page: number;
  };
}
