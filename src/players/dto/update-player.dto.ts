import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePlayerDto {
  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsEnum(['G', 'F', 'C'], { each: true })
  position?: ('G' | 'F' | 'C')[];

  @IsOptional()
  @IsString()
  height?: number;

  @IsOptional()
  @IsString()
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
