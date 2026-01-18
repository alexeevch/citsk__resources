import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  patronymic?: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsPhoneNumber('RU')
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  roleId: string;
}
