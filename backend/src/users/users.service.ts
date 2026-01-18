import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private saltRounds = 10;

  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const password = await bcrypt.hash(dto.password, this.saltRounds);

    return this.prisma.user.create({
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
  }

  async findAll() {
    return this.prisma.user.findMany({
      include: {
        role: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { role: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
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
      data.password = await bcrypt.hash(dto.password, this.saltRounds);
    }

    return this.prisma.user.update({
      where: { id },
      data,
      include: {
        role: true,
      },
    });
  }

  async ban(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { isBanned: true },
    });
  }
}
