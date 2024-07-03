import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':slug/posts')
  async findCategoryPosts(@Param('slug') slug: string) {
    const category = await this.categoriesService.findOne(slug);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return this.categoriesService.findCategoryPosts(category.id);
  }
}
