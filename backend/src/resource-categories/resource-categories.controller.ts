import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ResourceCategoriesService } from './resource-categories.service';
import { CreateResourceCategoryDto } from './dto/create-resource-category.dto';
import { UpdateResourceCategoryDto } from './dto/update-resource-category.dto';
import { JwtAuthGuard } from '../auth/common/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/common/guards/role.guard';
import { Roles } from '../auth/common/decorators/role.decorator';

@Controller('resource-categories')
export class ResourceCategoriesController {
  constructor(
    private readonly resourceCategoriesService: ResourceCategoriesService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  create(@Body() createResourceCategoryDto: CreateResourceCategoryDto) {
    return this.resourceCategoriesService.create(createResourceCategoryDto);
  }

  @Get()
  findAll() {
    return this.resourceCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resourceCategoriesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateResourceCategoryDto: UpdateResourceCategoryDto,
  ) {
    return this.resourceCategoriesService.update(id, updateResourceCategoryDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resourceCategoriesService.remove(id);
  }
}
