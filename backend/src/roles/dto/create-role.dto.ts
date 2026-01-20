import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsEngCode } from '../../common/decorators/validators/eng-code.decorator';
import { Transform } from 'class-transformer';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsEngCode()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.toUpperCase().trim();
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return value;
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  label: string;

  @IsOptional()
  @IsString()
  description: string;
}
