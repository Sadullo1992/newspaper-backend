import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get()
  async findAll() {
    return this.postsService.findAll();
  }

  @Get('featured_posts')
  async findFeaturedPosts() {
    return this.postsService.findFeaturedPosts();
  }

  @Get('actual_posts')
  async findActualPosts() {
    return this.postsService.findActualPosts();
  }

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    const post = await this.postsService.findBySlug(slug);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  @Get(':slug/related_posts')
  async findRelatedPosts(@Param('slug') slug: string) {
    return this.postsService.findRelatedPosts(slug);
  }
}
