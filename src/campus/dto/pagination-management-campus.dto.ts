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
import { PaginationManagementDto } from '@common/dto/management/pagination-management.dto';
import { PartialType } from '@nestjs/mapped-types';

export class PaginationManagementCampusDto extends PartialType(
  PaginationManagementDto,
) {
  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsNumber()
  annex?: number;
}
