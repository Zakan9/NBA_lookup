import { PositionEnum } from '../enums/position.enum';
import { TeamDto } from './team.dto';
export declare class UpdatePlayerDto {
    firstName?: string;
    lastName?: string;
    position?: PositionEnum[];
    height?: number;
    weight?: number;
    jerseyNumber?: string;
    college?: string;
    country?: string;
    draftYear?: number;
    draftRound?: number;
    draftNumber?: number;
    team?: TeamDto;
}
