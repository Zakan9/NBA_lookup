import {
  ArrayUnique,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PositionEnum } from '../enums/position.enum';
import { Type } from 'class-transformer';
import { TeamDto } from './team.dto';

export class UpdatePlayerDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEnum(PositionEnum, { each: true })
  @ArrayUnique()
  position?: PositionEnum[];

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsString()
  jerseyNumber?: string;

  @IsOptional()
  @IsString()
  college?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsNumber()
  draftYear?: number;

  @IsOptional()
  @IsNumber()
  draftRound?: number;

  @IsOptional()
  @IsNumber()
  draftNumber?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => TeamDto)
  team?: TeamDto;
}
