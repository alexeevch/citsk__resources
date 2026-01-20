import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { getIpWhitelist } from '../common/config/ip-whitelist.config';
import { isIpInWhitelist } from '../common/utils/ip-whitelist.util';

@Injectable()
export class ResourcesService {
  private readonly whitelist: string[];

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {
    this.whitelist = getIpWhitelist(this.config);
  }

  async create(createResourceDto: CreateResourceDto) {
    return this.prisma.resource.create({ data: createResourceDto });
  }

  async findAll(clientIp = ''): Promise<any> {
    const isTrusted = isIpInWhitelist(clientIp, this.whitelist);
    const resources = await this.prisma.resource.findMany({
      include: {
        organization: true,
        category: true,
      },
    });

    return isTrusted
      ? resources
      : resources.filter((resource) => !resource.isPrivate);
  }

  async findOne(id: string) {
    return this.prisma.resource.findUnique({
      where: { id },
      include: {
        organization: true,
        category: true,
      },
    });
  }

  async update(id: string, updateResourceDto: UpdateResourceDto) {
    const resource = await this.prisma.resource.findUnique({ where: { id } });
    if (!resource) {
      throw new NotFoundException(`Информационная система ${id} не найдена`);
    }

    return this.prisma.resource.update({
      where: { id },
      data: updateResourceDto,
      include: {
        organization: true,
        category: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.resource.deleteMany({ where: { id } });
  }
}
