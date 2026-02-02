import { Player, PlayersResponse, PlayerResponse } from '@/types/nba';
import mockData from '@/mocks/playersResponse.json';

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock implementation that returns data from JSON file
export const fetchPlayers = async (page: number, perPage: number = 6): Promise<PlayersResponse> => {
  // Simulate network delay
  await delay(500);

  const allPlayers = mockData.data as Player[];
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedPlayers = allPlayers.slice(startIndex, endIndex);

  return {
    data: paginatedPlayers,
    meta: {
      total_pages: Math.ceil(allPlayers.length / perPage),
      current_page: page,
      per_page: perPage,
      total_count: allPlayers.length,
    },
  };
};

export const fetchPlayer = async (id: number): Promise<PlayerResponse> => {
  // Simulate network delay
  await delay(300);

  const allPlayers = mockData.data as Player[];
  const player = allPlayers.find((p) => p.id === id);

  if (!player) {
    throw new Error('Player not found');
  }

  return { data: player };
};

// Real API calls (for when backend is ready)
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// export const fetchPlayers = async (page: number, perPage: number = 6): Promise<PlayersResponse> => {
//   const response = await axios.get<PlayersResponse>(`${API_BASE_URL}/players`, {
//     params: { page, per_page: perPage },
//   });
//   return response.data;
// };

// export const fetchPlayer = async (id: number): Promise<PlayerResponse> => {
//   const response = await axios.get<PlayerResponse>(`${API_BASE_URL}/players/${id}`);
//   return response.data;
// };
