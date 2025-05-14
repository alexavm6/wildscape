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
import { PaginationSearchRiskDto } from './pagination-search-risk.dto';
import { PartialType } from '@nestjs/mapped-types';

export class PaginationManagementSearchRiskDto extends PartialType(
  PaginationSearchRiskDto,
) {
  @IsOptional()
  @IsIn(['true', 'false', 'all'])
  @IsString()
  is_available?: string;
}
