import {
  IsOptional,
  IsString,
  IsNumber,
  IsPositive,
  IsDateString,
  IsMongoId,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '@common/dto/pagination.dto';
import { PartialType } from '@nestjs/mapped-types';

export class PaginationSearchRiskDto extends PartialType(PaginationDto) {
  @IsOptional()
  @IsString()
  name?: string;
}
