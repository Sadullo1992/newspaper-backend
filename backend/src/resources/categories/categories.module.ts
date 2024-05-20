import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { CategoryModule } from 'src/admin/category/category.module';
import { PostModule } from 'src/admin/post/post.module';

@Module({
  imports: [CategoryModule, PostModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
