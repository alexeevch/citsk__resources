import { Module } from '@nestjs/common';
import { ResourceCategoriesService } from './resource-categories.service';
import { ResourceCategoriesController } from './resource-categories.controller';

@Module({
  controllers: [ResourceCategoriesController],
  providers: [ResourceCategoriesService],
})
export class ResourceCategoriesModule {}
