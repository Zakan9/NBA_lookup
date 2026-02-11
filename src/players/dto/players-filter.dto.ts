import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ArrayUnique,
} from 'class-validator';
import { PaginationDto } from './pagination.dto';
import { IsGreaterThan } from '../validators/is-greater-than.validator';
import { PositionEnum } from '../enums/position.enum';

export class PlayersFilterDto extends PaginationDto {
  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsEnum(PositionEnum, { each: true })
  @ArrayUnique()
  position?: PositionEnum[];

  @IsOptional()
  @IsNumber()
  @IsPositive()
  draft_number?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  min_height?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @IsGreaterThan('min_height', {
    message: 'max_height must be greater than min_height',
  })
  max_height?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  min_weight?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @IsGreaterThan('min_weight', {
    message: 'max_weight must be greater than min_weight',
  })
  max_weight?: number;
}
