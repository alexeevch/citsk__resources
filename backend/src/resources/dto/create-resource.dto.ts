import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateResourceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl()
  link: string;

  @IsString()
  @IsNotEmpty()
  contacts: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  organizationId: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsOptional()
  @IsBoolean()
  isPrivate: boolean;
}
