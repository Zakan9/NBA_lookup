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
exports.PlayersFilterDto = void 0;
const class_validator_1 = require("class-validator");
const pagination_dto_1 = require("./pagination.dto");
const is_greater_than_validator_1 = require("../validators/is-greater-than.validator");
const position_enum_1 = require("../enums/position.enum");
class PlayersFilterDto extends pagination_dto_1.PaginationDto {
    firstName;
    lastName;
    country;
    position;
    draftNumber;
    minHeight;
    maxHeight;
    minWeight;
    maxWeight;
}
exports.PlayersFilterDto = PlayersFilterDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PlayersFilterDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PlayersFilterDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PlayersFilterDto.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(position_enum_1.PositionEnum, { each: true }),
    (0, class_validator_1.ArrayUnique)(),
    __metadata("design:type", Array)
], PlayersFilterDto.prototype, "position", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], PlayersFilterDto.prototype, "draftNumber", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], PlayersFilterDto.prototype, "minHeight", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, is_greater_than_validator_1.IsGreaterThan)('minHeight', {
        message: 'maxHeight must be greater than minHeight',
    }),
    __metadata("design:type", Number)
], PlayersFilterDto.prototype, "maxHeight", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], PlayersFilterDto.prototype, "minWeight", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    (0, is_greater_than_validator_1.IsGreaterThan)('minWeight', {
        message: 'maxWeight must be greater than minWeight',
    }),
    __metadata("design:type", Number)
], PlayersFilterDto.prototype, "maxWeight", void 0);
//# sourceMappingURL=players-filter.dto.js.map