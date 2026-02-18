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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerSchema = exports.Player = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const position_enum_1 = require("../enums/position.enum");
const teams_schema_1 = require("./teams.schema");
let Player = class Player {
    externalId;
    firstName;
    lastName;
    position;
    height;
    weight;
    jerseyNumber;
    college;
    country;
    draftYear;
    draftRound;
    draftNumber;
    team;
    isDeleted;
};
exports.Player = Player;
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Number)
], Player.prototype, "externalId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Player.prototype, "firstName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Player.prototype, "lastName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], required: false, enum: Object.values(position_enum_1.PositionEnum) }),
    __metadata("design:type", Array)
], Player.prototype, "position", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Number)
], Player.prototype, "height", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Number)
], Player.prototype, "weight", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Player.prototype, "jerseyNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Player.prototype, "college", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Player.prototype, "country", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Number)
], Player.prototype, "draftYear", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Number)
], Player.prototype, "draftRound", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Number)
], Player.prototype, "draftNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: teams_schema_1.TeamSchema, required: false }),
    __metadata("design:type", teams_schema_1.Team)
], Player.prototype, "team", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Player.prototype, "isDeleted", void 0);
exports.Player = Player = __decorate([
    (0, mongoose_1.Schema)()
], Player);
exports.PlayerSchema = mongoose_1.SchemaFactory.createForClass(Player);
//# sourceMappingURL=players.schema.js.map