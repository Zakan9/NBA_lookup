import { ITeam } from './team.interface';
export interface IPlayer {
    externalId: number;
    firstName: string;
    lastName: string;
    position: string[];
    height: number | null;
    weight: number | null;
    jerseyNumber: string;
    college: string;
    country: string;
    draftYear: number;
    draftRound: number;
    draftNumber: number;
    team: ITeam;
}
