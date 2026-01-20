import { SetMetadata } from '@nestjs/common';
import { Role } from '../auth.types';

export const Roles = (...roles: Role[] | Role[][]) => {
  const rolesArray = Array.isArray(roles[0]) ? roles[0] : (roles as Role[]);
  return SetMetadata('roles', rolesArray);
};
