import {
  ArrayUnique,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PositionEnum } from '../enums/position.enum';

export class UpdatePlayerDto {
  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

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
  jersey_number?: string;

  @IsOptional()
  @IsString()
  college?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsNumber()
  draft_year?: number;

  @IsOptional()
  @IsNumber()
  draft_round?: number;

  @IsOptional()
  @IsNumber()
  draft_number?: number;
}
