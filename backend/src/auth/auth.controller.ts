import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Request as ExpressReq } from 'express';
import { Role, User } from '@prisma/client';

type AuthenticatedRequest = ExpressReq & {
  user: User & { role: Role };
};

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(
    @Request()
    req: AuthenticatedRequest,
  ) {
    return this.authService.login(req.user);
  }
}
