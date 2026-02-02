import { apiSlice } from '@/app/api/apiSlice';
import { mockPlayers } from '../../mocks/players';
import { PlayersResponse, PlayerResponse } from '@/types/nba';

// Mock delay to simulate network request
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock query function for players list
const getMockPlayersResponse = (page: number, perPage: number): PlayersResponse => {
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedPlayers = mockPlayers.slice(startIndex, endIndex);

  return {
    data: paginatedPlayers,
    meta: {
      total_pages: Math.ceil(mockPlayers.length / perPage),
      current_page: page,
      per_page: perPage,
      total_count: mockPlayers.length,
    },
  };
};

// Mock query function for single player
const getMockPlayerResponse = (id: number): PlayerResponse | null => {
  const player = mockPlayers.find((p) => p.id === id);
  if (!player) return null;
  return { data: player };
};

export const playersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlayers: builder.query<PlayersResponse, { page: number; perPage?: number }>({
      queryFn: async ({ page, perPage = 6 }) => {
        // Simulate network delay
        await delay(500);

        // TODO: Replace with actual API call when backend is ready
        // return { url: '/players', params: { page, per_page: perPage } };

        const response = getMockPlayersResponse(page, perPage);
        return { data: response };
      },
    }),
    getPlayer: builder.query<PlayerResponse, number>({
      queryFn: async (id) => {
        // Simulate network delay
        await delay(300);

        // TODO: Replace with actual API call when backend is ready
        // return { url: `/players/${id}` };

        const response = getMockPlayerResponse(id);
        if (!response) {
          return { error: { status: 404, data: 'Player not found' } };
        }
        return { data: response };
      },
    }),
  }),
});

export const { useGetPlayersQuery, useGetPlayerQuery } = playersApiSlice;
