import { PaginationDto } from './pagination.dto';
import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';

import { IsOptional, IsBoolean, IsString, IsIn } from 'class-validator';

export class PaginationSimpleDto extends PartialType(PaginationDto) {
  @IsOptional()
  @IsIn(['true', 'false'])
  @IsString()
  simple?: string;
}
