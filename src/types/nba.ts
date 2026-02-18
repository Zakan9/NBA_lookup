export interface Team {
  id: number;
  conference: string;
  division: string;
  city: string;
  name: string;
  full_name: string;
  abbreviation: string;
}

export interface Player {
  _id: string;
  externalId?: number;
  first_name: string;
  last_name: string;
  position: string[];
  height: number | null;
  weight: number | null;
  jersey_number?: string;
  college?: string;
  country?: string;
  draft_year?: number;
  draft_round?: number;
  draft_number?: number;
  team?: Team;
}

export interface PlayersResponse {
  data: Player[];
  meta: {
    total_pages: number;
    current_page: number;
    per_page: number;
    total_count: number;
  };
}

export interface PlayerResponse {
  data: Player;
}
