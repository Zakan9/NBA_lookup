"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var PlayersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayersService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const players_schema_1 = require("./schemas/players.schema");
const mongoose_2 = require("mongoose");
const schedule_1 = require("@nestjs/schedule");
const constants_utils_1 = require("../utils/constants.utils");
const countries_ts_1 = require("countries-ts");
const convert_lbs_to_kg_utility_1 = require("./utility/convert-lbs-to-kg.utility");
const convert_feet_and_inches_to_cm_utility_1 = require("./utility/convert-feet-and-inches-to-cm.utility");
let PlayersService = PlayersService_1 = class PlayersService {
    configService;
    playerModel;
    apiKey;
    baseUrl;
    logger = new common_1.Logger(PlayersService_1.name);
    constructor(configService, playerModel) {
        this.configService = configService;
        this.playerModel = playerModel;
        this.apiKey = this.configService.getOrThrow('API_KEY');
        this.baseUrl = this.configService.getOrThrow('BASE_URL');
    }
    async createPlayer(createPlayerDto) {
        const createdPlayer = await this.playerModel.create(createPlayerDto);
        return createdPlayer;
    }
    async deletePlayer(id) {
        await this.playerModel.findOneAndDelete({ _id: id });
    }
    async deleteAllPlayers() {
        await this.playerModel.deleteMany({});
    }
    async updatePlayer(id, updatePlayerDto) {
        return this.playerModel.findOneAndUpdate({ _id: id, isDeleted: false }, updatePlayerDto, {
            new: true,
        });
    }
    async upsertExternalPlayer(player) {
        const mappedPlayer = {
            externalId: player.externalId,
            firstName: player.firstName,
            lastName: player.lastName,
            position: player.position,
            height: player.height,
            weight: player.weight,
            jerseyNumber: player.jerseyNumber,
            college: player.college,
            country: player.country,
            draftYear: player.draftYear,
            draftRound: player.draftRound,
            draftNumber: player.draftNumber,
            team: player.team,
        };
        await this.playerModel.updateOne({ externalId: player.externalId, isDeleted: false }, { $set: mappedPlayer }, { upsert: true });
    }
    async getPlayerById(id) {
        return this.playerModel.findOne({ _id: id, isDeleted: false }).exec();
    }
    async getPlayersFromDatabase(playersFilterDto) {
        const query = { isDeleted: false };
        if (playersFilterDto.firstName) {
            query.firstName = { $regex: playersFilterDto.firstName, $options: 'i' };
        }
        if (playersFilterDto.lastName) {
            query.lastName = { $regex: playersFilterDto.lastName, $options: 'i' };
        }
        if (playersFilterDto.country) {
            query.country = playersFilterDto.country;
        }
        if (playersFilterDto.position) {
            query.position = playersFilterDto.position;
        }
        if (playersFilterDto.draftNumber !== undefined) {
            query.draftNumber = playersFilterDto.draftNumber;
        }
        if (playersFilterDto.minHeight !== undefined ||
            playersFilterDto.maxHeight !== undefined) {
            query.height = {};
            if (playersFilterDto.minHeight !== undefined)
                query.height.$gte = playersFilterDto.minHeight;
            if (playersFilterDto.maxHeight !== undefined)
                query.height.$lte = playersFilterDto.maxHeight;
        }
        if (playersFilterDto.minWeight !== undefined ||
            playersFilterDto.maxWeight !== undefined) {
            query.weight = {};
            if (playersFilterDto.minWeight !== undefined)
                query.weight.$gte = playersFilterDto.minWeight;
            if (playersFilterDto.maxWeight !== undefined)
                query.weight.$lte = playersFilterDto.maxWeight;
        }
        const limit = playersFilterDto.limit ?? constants_utils_1.DEFAULT_PAGE_SIZE;
        const page = playersFilterDto.page ?? 1;
        const skip = (page - 1) * limit;
        const [players, totalCount] = await Promise.all([
            this.playerModel.find(query).skip(skip).limit(limit).exec(),
            this.playerModel.countDocuments(query),
        ]);
        return {
            data: players,
            meta: {
                totalCount,
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page,
                perPage: limit,
            },
        };
    }
    async getPlayersFromApi() {
        let nextCursor = null;
        const allPlayers = [];
        do {
            try {
                const response = await axios_1.default.get(nextCursor !== null
                    ? `${this.baseUrl}/players?per_page=100&cursor=${nextCursor}`
                    : `${this.baseUrl}/players?per_page=100`, {
                    headers: {
                        Authorization: this.apiKey,
                    },
                });
                const data = response.data;
                const players = response.data.data.map(({ id, first_name, last_name, position, height, weight, jersey_number, college, country, draft_year, draft_round, draft_number, team, }) => {
                    let countryValue = '';
                    let tempPosition = [];
                    let tempWeight = null;
                    let tempHeight = null;
                    if (country !== '') {
                        const countryData = (0, countries_ts_1.getByCountry)(country);
                        countryValue = countryData?.code || country;
                    }
                    if (position !== '') {
                        if (position.length > 1) {
                            const parts = position.split('-');
                            tempPosition = parts;
                        }
                        else {
                            tempPosition[0] = position[0];
                        }
                    }
                    if (typeof weight === 'string') {
                        tempWeight = (0, convert_lbs_to_kg_utility_1.convertLbsToKg)(weight);
                    }
                    if (typeof height === 'string') {
                        tempHeight = (0, convert_feet_and_inches_to_cm_utility_1.convertFeetAndInchesToCm)(height);
                    }
                    return {
                        externalId: id,
                        firstName: first_name,
                        lastName: last_name,
                        position: tempPosition,
                        height: tempHeight,
                        weight: tempWeight,
                        jerseyNumber: jersey_number,
                        college: college,
                        country: countryValue,
                        draftYear: draft_year,
                        draftRound: draft_round,
                        draftNumber: draft_number,
                        team: {
                            id: team.id,
                            conference: team.conference,
                            division: team.division,
                            city: team.city,
                            name: team.name,
                            fullName: team.full_name,
                            abbreviation: team.abbreviation,
                        },
                    };
                });
                allPlayers.push(...players);
                nextCursor = data.meta.next_cursor;
                if (typeof nextCursor !== 'number' || isNaN(nextCursor)) {
                    nextCursor = null;
                }
                if (nextCursor !== null) {
                    await new Promise((resolve) => setTimeout(resolve, 500));
                }
            }
            catch (error) {
                if (axios_1.default.isAxiosError(error) && error.response?.status === 429) {
                    await new Promise((resolve) => setTimeout(resolve, 60000));
                    continue;
                }
                throw error;
            }
        } while (nextCursor !== null);
        return allPlayers;
    }
    async upsertPlayersToDatabase() {
        this.logger.log('Cron job starting (upsertPlayersToDatabase)');
        try {
            const players = await this.getPlayersFromApi();
            this.logger.log(`Fetched ${players.length} players from API`);
            for (const player of players) {
                await this.upsertExternalPlayer(player);
            }
            this.logger.log('Cron job finished successfully');
        }
        catch (error) {
            this.logger.error(`Cron job failed (upsertPlayersToDatabase).\nError: ${error}`);
        }
    }
};
exports.PlayersService = PlayersService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlayersService.prototype, "upsertPlayersToDatabase", null);
exports.PlayersService = PlayersService = PlayersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(players_schema_1.Player.name)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        mongoose_2.Model])
], PlayersService);
//# sourceMappingURL=players.service.js.map