import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':slug/posts')
  async findCategoryPosts(
    @Param('slug') slug: string,
    @Query('page') page: number,
    @Query('perPage') perPage: number,
  ) {
    const category = await this.categoriesService.findOne(slug);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return this.categoriesService.findCategoryPosts(category.id, {
      page,
      perPage,
    });
  }
}
