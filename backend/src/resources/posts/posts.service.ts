import { Injectable } from '@nestjs/common';
import { PostService } from 'src/admin/post/post.service';

@Injectable()
export class PostsService {
  constructor(private postService: PostService) {}

  findAll() {
    return this.postService.findAll([
      'id',
      'title',
      'created_at',
      'updated_at',
      'slug',
      'views',
    ]);
  }

  findFeaturedPosts() {
    const allPosts = this.postService.findAll();

    return allPosts.filter(({ is_featured }) => is_featured);
  }

  findDolzarbPosts() {
    const allPosts = this.postService.findAll();

    return allPosts.filter(({ dolzarb }) => dolzarb);
  }

  findBySlug(slug: string) {
    return this.postService.findBySlug(slug);
  }

  getRelatedPosts(slug: string) {
    const post = this.postService.findBySlug(slug);

    const allPosts = this.postService.findAll();

    return allPosts.filter((item) => item.categoryId === post.categoryId);
  }

  findOne(id: string) {
    return this.postService.findOne(id);
  }
}
