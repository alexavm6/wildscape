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
import { PaginationSearchCityDto } from './pagination-search-city.dto';
import { PartialType } from '@nestjs/mapped-types';

export class PaginationManagementSearchCityDto extends PartialType(
  PaginationSearchCityDto,
) {
  @IsOptional()
  @IsIn(['true', 'false', 'all'])
  @IsString()
  is_available?: string;
}
