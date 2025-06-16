import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsBoolean,
  IsMongoId,
  Min,
  IsOptional,
  IsDate,
  IsISO8601,
} from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsBoolean()
  is_available?: boolean;
}
