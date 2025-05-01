import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class UpdateCompanyDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @Length(11)
  ruc?: string;
}
