import { SetMetadata } from '@nestjs/common';

export enum Role {
  'ADMIN',
  'ROOT',
}

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
