import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  private SALT_ROUNDS = 10;

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const password = await bcrypt.hash(dto.password, this.SALT_ROUNDS);

    const user = await this.prisma.user.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        phone: dto.phone,
        password,
        role: {
          connect: { id: dto.roleId },
        },
      },
      include: {
        role: true,
      },
    });

    return plainToInstance(UserResponseDto, user);
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      include: {
        role: true,
      },
    });

    return plainToInstance(UserResponseDto, users);
  }

  async findById(id: string, withPassword = false) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { role: true },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return withPassword ? user : plainToInstance(UserResponseDto, user);
  }

  async findByEmail(email: string, withPassword = false) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });

    if (!user) {
      throw new NotFoundException(`Пользователь с email ${email} не найден`);
    }

    return withPassword ? user : plainToInstance(UserResponseDto, user);
  }

  async update(id: string, dto: UpdateUserDto) {
    const data: Prisma.UserUpdateInput = {
      firstName: dto.firstName,
      lastName: dto.lastName,
      patronymic: dto.patronymic,
      email: dto.email,
      phone: dto.phone,
    };

    if (dto.roleId) {
      data.role = {
        connect: { id: dto.roleId },
      };
    }

    if (dto.password) {
      data.password = await bcrypt.hash(dto.password, this.SALT_ROUNDS);
    }

    const user = await this.prisma.user.update({
      where: { id },
      data,
      include: {
        role: true,
      },
    });

    return plainToInstance(UserResponseDto, user);
  }

  async ban(id: string) {
    const user = await this.prisma.user.update({
      where: { id },
      data: { isBanned: true },
    });

    return plainToInstance(UserResponseDto, user);
  }
}
