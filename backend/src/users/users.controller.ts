import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.userService.create(dto);
    return plainToInstance(UserResponseDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userService.findAll();
    return plainToInstance(UserResponseDto, users);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.userService.findOne(id);
    return plainToInstance(UserResponseDto, user);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.userService.update(id, dto);
    return plainToInstance(UserResponseDto, user);
  }

  @Post(':id/ban')
  async ban(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.userService.ban(id);
    return plainToInstance(UserResponseDto, user);
  }
}
