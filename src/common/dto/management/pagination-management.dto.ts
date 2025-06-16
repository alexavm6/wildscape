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
import { PaginationDto } from '@common/dto/pagination.dto';
import { PartialType } from '@nestjs/mapped-types';

export class PaginationManagementDto extends PartialType(PaginationDto) {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsIn(['true', 'false', 'all'])
  @IsString()
  is_available?: string;
}
