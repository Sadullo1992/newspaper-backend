import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get('featured_posts')
  findFeaturedPosts() {
    return this.postsService.findFeaturedPosts();
  }

  @Get('dolzarb_posts')
  findActualPosts() {
    return this.postsService.findActualPosts();
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    const post = this.postsService.findBySlug(slug);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  @Get(':slug/related_posts')
  getRelatedPosts(@Param('slug') slug: string) {
    const post = this.postsService.getRelatedPosts(slug);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    const post = this.postsService.findOne(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }
}
