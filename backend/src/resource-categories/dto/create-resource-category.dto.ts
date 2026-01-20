import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { IsEngCode } from '../../common/decorators/validators/eng-code.decorator';
import { Transform } from 'class-transformer';

export class CreateResourceCategoryDto {
  @IsString()
  @IsEngCode()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.toLowerCase().trim();
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return value;
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  label: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  sortIndex: number;
}
