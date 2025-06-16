import { PaginationDto } from '@common/dto/pagination.dto';
import { PartialType } from '@nestjs/mapped-types';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsPositive,
  IsDateString,
  IsIn,
  IsMongoId,
  Min,
} from 'class-validator';
import { PaginationSimpleSearchEventDto } from './pagination-simple-search-event.dto';

export class PaginationManagementSearchEventDto extends PartialType(
  PaginationSimpleSearchEventDto,
) {
  @IsOptional()
  @IsIn(['true', 'false', 'all'])
  @IsString()
  is_available?: string;
}
