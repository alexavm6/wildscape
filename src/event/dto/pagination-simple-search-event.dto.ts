import {
  IsOptional,
  IsString,
  IsNumber,
  IsPositive,
  IsDateString,
  IsMongoId,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '@common/dto/pagination.dto';
import { PartialType } from '@nestjs/mapped-types';

export class PaginationSimpleSearchEventDto extends PartialType(PaginationDto) {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsMongoId()
  campus_id?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  min_price?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  max_price?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  capacity?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  min_capacity?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  max_capacity?: number;

  @IsOptional()
  @IsMongoId()
  department_id?: string;

  @IsOptional()
  @IsMongoId()
  province_id?: string;

  @IsOptional()
  @IsMongoId()
  district_id?: string;

  @IsOptional()
  @IsMongoId()
  city_id?: string;

  @IsOptional()
  @IsString()
  address?: string;
}
