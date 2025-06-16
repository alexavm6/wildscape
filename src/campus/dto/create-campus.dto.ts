import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsBoolean,
  IsMongoId,
  Min,
  IsOptional,
  IsDate,
  IsISO8601,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCampusDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsNumber()
  annex?: number;

  @IsOptional()
  @IsMongoId()
  company_id?: string;

  @IsOptional()
  @IsBoolean()
  is_available?: boolean;
}
