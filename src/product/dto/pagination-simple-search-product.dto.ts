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
import { PaginationSimpleDto } from '@common/dto/pagination-simple.dto';
import { PartialType } from '@nestjs/mapped-types';

export class PaginationSimpleSearchProductDto extends PartialType(
  PaginationSimpleDto,
) {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsMongoId()
  activity_id?: string;

  @IsOptional()
  @IsMongoId()
  category_id?: string;

  @IsOptional()
  @IsMongoId()
  risk_id?: string;

  @IsOptional()
  @IsMongoId()
  campus_id?: string;

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
  @IsNumber()
  @Min(0)
  displacement_duration?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  min_displacement_duration?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  max_displacement_duration?: number;

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
  activity_duration?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  min_activity_duration?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  max_activity_duration?: number;

  @IsOptional()
  @IsMongoId()
  activity_department_id?: string;

  @IsOptional()
  @IsMongoId()
  activity_province_id?: string;

  @IsOptional()
  @IsMongoId()
  activity_district_id?: string;

  @IsOptional()
  @IsMongoId()
  activity_city_id?: string;

  @IsOptional()
  @IsString()
  activity_address?: string;

  @IsOptional()
  @IsMongoId()
  meeting_department_id?: string;

  @IsOptional()
  @IsMongoId()
  meeting_province_id?: string;

  @IsOptional()
  @IsMongoId()
  meeting_district_id?: string;

  @IsOptional()
  @IsMongoId()
  meeting_city_id?: string;

  @IsOptional()
  @IsString()
  meeting_address?: string;
}
