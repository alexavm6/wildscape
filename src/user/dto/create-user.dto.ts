import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Length,
  Matches,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  names: string;

  @IsOptional()
  @IsString()
  last_names?: string;

  @IsOptional()
  @IsString()
  @Length(8, 8)
  dni?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{9}$/)
  telephone?: string;

  @IsOptional()
  @IsBoolean()
  is_available?: boolean;
}
