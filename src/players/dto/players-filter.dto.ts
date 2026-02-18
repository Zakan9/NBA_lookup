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
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

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
  draftNumber?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  minHeight?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @IsGreaterThan('minHeight', {
    message: 'maxHeight must be greater than minHeight',
  })
  maxHeight?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  minWeight?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @IsGreaterThan('minWeight', {
    message: 'maxWeight must be greater than minWeight',
  })
  maxWeight?: number;
}
