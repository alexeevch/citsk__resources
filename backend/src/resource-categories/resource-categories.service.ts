import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResourceCategoryDto } from './dto/create-resource-category.dto';
import { UpdateResourceCategoryDto } from './dto/update-resource-category.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ResourceCategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createResourceCategoryDto: CreateResourceCategoryDto) {
    return this.prisma.resourceCategory.create({
      data: createResourceCategoryDto,
    });
  }

  async findAll() {
    return this.prisma.resourceCategory.findMany();
  }

  async findOne(id: string) {
    const category = await this.prisma.resourceCategory.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Категория ${id} не найдена`);
    }

    return category;
  }

  async update(
    id: string,
    updateResourceCategoryDto: UpdateResourceCategoryDto,
  ) {
    return this.prisma.resourceCategory.update({
      where: { id },
      data: updateResourceCategoryDto,
    });
  }

  async remove(id: string) {
    return this.prisma.resourceCategory.delete({ where: { id } });
  }
}
