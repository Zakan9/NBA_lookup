// dto/team.dto.ts
import { IsDefined, IsNumber, IsString } from 'class-validator';

export class TeamDto {
  @IsDefined()
  @IsNumber()
  id!: number;

  @IsDefined()
  @IsString()
  conference!: string;

  @IsDefined()
  @IsString()
  division!: string;

  @IsDefined()
  @IsString()
  city!: string;

  @IsDefined()
  @IsString()
  name!: string;

  @IsDefined()
  @IsString()
  full_name!: string;

  @IsDefined()
  @IsString()
  abbreviation!: string;
}
