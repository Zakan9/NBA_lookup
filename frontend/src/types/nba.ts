export interface Team {
  id: number;
  conference: string;
  division: string;
  city: string;
  name: string;
  fullName: string;
  abbreviation: string;
}

export interface Player {
  _id: string;
  externalId?: number;
  firstName: string;
  lastName: string;
  position: string[];
  height: number | null;
  weight: number | null;
  jerseyNumber?: string;
  college?: string;
  country?: string;
  draftYear?: number;
  draftRound?: number;
  draftNumber?: number;
  team?: Team;
}

export interface PlayersResponse {
  data: Player[];
  meta: {
    totalPages: number;
    currentPage: number;
    perPage: number;
    totalCount: number;
  };
}

export interface PlayerResponse {
  data: Player;
}
