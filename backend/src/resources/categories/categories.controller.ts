import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id/posts')
  async findCategoryPosts(@Param('id', ParseUUIDPipe) id: string) {
    const category = await this.categoriesService.findOne(id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return this.categoriesService.findCategoryPosts(id);
  }
}
