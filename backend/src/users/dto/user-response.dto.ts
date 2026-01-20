import { Exclude, Expose, Transform, Type } from 'class-transformer';

export class RoleResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  label: string;
}

export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  patronymic?: string | null;

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
