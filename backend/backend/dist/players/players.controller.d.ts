import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PlayersFilterDto } from './dto/players-filter.dto';
export declare class PlayersController {
    private readonly playersService;
    constructor(playersService: PlayersService);
    getPlayersFromDatabase(playersFilterDto: PlayersFilterDto): Promise<{
        data: import("./schemas/players.schema").Player[];
        meta: {
            totalCount: number;
            totalPages: number;
            currentPage: number;
            perPage: number;
        };
    }>;
    getPlayerById(id: string): Promise<{
        data: import("./schemas/players.schema").Player;
    }>;
    createPlayer(createPlayerDto: CreatePlayerDto): Promise<import("./schemas/players.schema").Player>;
    deletePlayer(id: string): Promise<void>;
    deleteAllPlayers(): Promise<void>;
    updatePlayer(id: string, updatePlayerDto: UpdatePlayerDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/players.schema").Player, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/players.schema").Player & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}
