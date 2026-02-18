import axios from 'axios';
import { PlayersResponse, PlayerResponse } from '@/types/nba';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const fetchPlayers = async (
  page: number,
  perPage: number = 6,
  search: string = '',
): Promise<PlayersResponse> => {
  const response = await axios.get<PlayersResponse>(`${API_BASE_URL}/players`, {
    params: {
      page,
      limit: perPage,
      ...(search ? { firstName: search } : {}),
    },
  });
  return response.data;
};

export const fetchPlayer = async (id: string): Promise<PlayerResponse> => {
  const response = await axios.get<PlayerResponse>(`${API_BASE_URL}/players/${id}`);
  return response.data;
};
