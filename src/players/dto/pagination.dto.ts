import { Optional } from '@nestjs/common';
import { IsNumber, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @IsPositive()
  @Optional()
  skip: number;

  @IsNumber()
  @IsPositive()
  @Optional()
  limit: number;
}
