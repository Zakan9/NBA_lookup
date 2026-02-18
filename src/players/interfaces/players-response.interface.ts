type ITeamFromApi = {
  id: number;
  conference: string;
  division: string;
  city: string;
  name: string;
  full_name: string;
  abbreviation: string;
};

type IPlayerFromApi = {
  id: number;
  first_name: string;
  last_name: string;
  weight: string;
  height: string;
  position: string;
  jersey_number: string;
  college: string;
  country: string;
  draft_year: number;
  draft_round: number;
  draft_number: number;
  team: ITeamFromApi;
};

export interface IPlayersResponse {
  data: IPlayerFromApi[];
  meta: {
    next_cursor: number | null;
    per_page: number;
  };
}
