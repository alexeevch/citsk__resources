import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  Min,
} from 'class-validator';
import { IsINN } from '../../common/decorators/validators/inn.decorator';
import { IsOGRN } from '../../common/decorators/validators/ogrn.decorator';

export class CreateOrganizationDto {
  @IsINN()
  inn: string;

  @IsOGRN()
  ogrn: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsUrl()
  @Matches(/\.(jpg|jpeg|png|webp)$/i, {
    message: 'Фото должно быть в формате: jpg, jpeg, png или webp',
  })
  logo: string;

  @IsOptional()
  @IsInt()
  @Min(0, { message: 'Минимальное значение сортировки: 0' })
  sortIndex: number;
}
