import { Injectable } from '@nestjs/common';
import { CategoryService } from 'src/admin/category/category.service';
import { PostService } from 'src/admin/post/post.service';

@Injectable()
export class CategoriesService {
  constructor(
    private categoryService: CategoryService,
    private postService: PostService,
  ) {}

  findAll() {
    return this.categoryService.findAll();
  }

  findPostsByCategory(categoryId: string) {
    const allPosts = this.postService.findAll();

    return allPosts.filter((item) => item.categoryId === categoryId);
  }
}
