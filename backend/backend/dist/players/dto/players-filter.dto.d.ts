import { PaginationDto } from './pagination.dto';
import { PositionEnum } from '../enums/position.enum';
export declare class PlayersFilterDto extends PaginationDto {
    firstName?: string;
    lastName?: string;
    country?: string;
    position?: PositionEnum[];
    draftNumber?: number;
    minHeight?: number;
    maxHeight?: number;
    minWeight?: number;
    maxWeight?: number;
}
