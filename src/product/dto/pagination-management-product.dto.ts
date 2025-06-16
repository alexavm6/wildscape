import {
  IsOptional,
  IsString,
  IsNumber,
  IsPositive,
  IsDateString,
  IsMongoId,
  Min,
  IsIn,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationSearchProductDto } from './pagination-search-product.dto';
import { PartialType } from '@nestjs/mapped-types';

export class PaginationManagementProductDto extends PartialType(
  PaginationSearchProductDto,
) {
  @IsOptional()
  @IsIn(['true', 'false', 'all'])
  @IsString()
  is_available?: string;

  @IsOptional()
  @IsIn(['true', 'false', 'all'])
  @IsString()
  registration_availability?: string;
}
