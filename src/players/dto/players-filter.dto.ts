import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class PlayersFilterDto {
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
  @IsString()
  position?: string;

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
  max_height?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  min_weight?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  max_weight?: number;
}
