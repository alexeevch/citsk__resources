import { Exclude, Expose, Type } from 'class-transformer';

export class RoleResponseDto {
  @Expose()
  id: string;

  @Expose()
  code: string;

  @Expose()
  name: string;
}

export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  patronymic?: string;

  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  isBanned: boolean;

  @Expose()
  createdAt: Date;

  @Type(() => RoleResponseDto)
  @Expose()
  role: RoleResponseDto;

  @Exclude()
  roleId: string;

  @Exclude()
  password: string;
}
