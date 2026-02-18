import { ConfigService } from '@nestjs/config';
import { Player } from './schemas/players.schema';
import { Model } from 'mongoose';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { IPlayer } from './interfaces/player.interface';
import { PlayersFilterDto } from './dto/players-filter.dto';
export declare class PlayersService {
    private configService;
    private playerModel;
    private readonly apiKey;
    private readonly baseUrl;
    private readonly logger;
    constructor(configService: ConfigService, playerModel: Model<Player>);
    createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player>;
    deletePlayer(id: string): Promise<void>;
    deleteAllPlayers(): Promise<void>;
    updatePlayer(id: string, updatePlayerDto: UpdatePlayerDto): Promise<(import("mongoose").Document<unknown, {}, Player, {}, import("mongoose").DefaultSchemaOptions> & Player & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    upsertExternalPlayer(player: IPlayer): Promise<void>;
    getPlayerById(id: string): Promise<Player | null>;
    getPlayersFromDatabase(playersFilterDto: PlayersFilterDto): Promise<{
        data: Player[];
        meta: {
            totalCount: number;
            totalPages: number;
            currentPage: number;
            perPage: number;
        };
    }>;
    getPlayersFromApi(): Promise<IPlayer[]>;
    upsertPlayersToDatabase(): Promise<void>;
}
