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
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

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
  @Min(1)
  capacity?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  displacement_duration?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  activity_day?: Date;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  activity_duration?: number;

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
  @IsDate()
  @Type(() => Date)
  activity_time?: Date;

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

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  meeting_time?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  start_day?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  end_day?: Date;

  @IsOptional()
  @IsBoolean()
  is_available?: boolean;
}
