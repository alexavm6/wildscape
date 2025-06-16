import {
  IsOptional,
  IsString,
  IsNumber,
  IsPositive,
  IsNotEmpty,
  IsDateString,
  IsMongoId,
  Min,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '@common/dto/pagination.dto';
import { PartialType } from '@nestjs/mapped-types';

export class PaginationSearchProductDto extends PartialType(PaginationDto) {
  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsMongoId()
  activity_id?: string;

  @IsOptional()
  @IsMongoId()
  category_id?: string;

  @IsOptional()
  @IsMongoId()
  risk_id?: string;

  /*capacity*/
  @IsOptional()
  @IsNumber()
  @Min(1)
  capacity?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  min_capacity?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  max_capacity?: number;
  /**/

  /*price*/
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
  /**/

  /*activity_duration*/
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
  /**/

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
}
