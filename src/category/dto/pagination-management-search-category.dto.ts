import {
  IsOptional,
  IsString,
  IsNumber,
  IsPositive,
  IsDateString,
  IsMongoId,
  Min,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationSearchCategoryDto } from './pagination-search-category.dto';
import { PartialType } from '@nestjs/mapped-types';

export class PaginationManagementSearchCategoryDto extends PartialType(
  PaginationSearchCategoryDto,
) {
  @IsOptional()
  @IsIn(['true', 'false', 'all'])
  @IsString()
  is_available?: string;
}
