import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Request as ExpressReq } from 'express';
import { UserWithRole } from '../users/users.types';

type AuthenticatedRequest = ExpressReq & { user: UserWithRole };

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(
    @Request()
    request: AuthenticatedRequest,
  ) {
    return this.authService.login(request.user);
  }
}
