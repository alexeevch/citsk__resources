import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ResourcesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createResourceDto: CreateResourceDto) {
    return this.prisma.resource.create({ data: createResourceDto });
  }

  async findAll() {
    return this.prisma.resource.findMany();
  }

  async findOne(id: string) {
    return this.prisma.resource.findUnique({ where: { id } });
  }

  async update(id: string, updateResourceDto: UpdateResourceDto) {
    const resource = await this.prisma.resource.findUnique({ where: { id } });
    if (!resource) {
      throw new NotFoundException(`Информационная система ${id} не найдена`);
    }

    return this.prisma.resource.update({
      where: { id },
      data: updateResourceDto,
    });
  }

  async remove(id: string) {
    return this.prisma.resource.deleteMany({ where: { id } });
  }
}
