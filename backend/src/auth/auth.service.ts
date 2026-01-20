import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserWithRole } from '../users/common/users.types';
import { JWTPayload } from './common/auth.types';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from '../users/dto/user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email, true);
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return null;

    return user;
  }

  login(user: UserWithRole) {
    const payload: JWTPayload = {
      id: user.id,
      role: user.role.name,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: plainToInstance(UserResponseDto, user),
    };
  }
}
