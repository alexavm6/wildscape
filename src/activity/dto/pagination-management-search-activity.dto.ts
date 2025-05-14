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
import { PaginationSearchActivityDto } from './pagination-search-activity.dto';
import { PartialType } from '@nestjs/mapped-types';

export class PaginationManagementSearchActivityDto extends PartialType(
  PaginationSearchActivityDto,
) {
  @IsOptional()
  @IsIn(['true', 'false', 'all'])
  @IsString()
  is_available?: string;
}
