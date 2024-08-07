import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { Public } from 'src/admin/auth/public.decorator';
import { PostsService } from './posts.service';

@Public()
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
  ) {
    return this.postsService.findAll({ page, perPage });
  }

  @Get('featured_posts')
  async findFeaturedPosts(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
  ) {
    return this.postsService.findFeaturedPosts({ page, perPage });
  }

  @Get('actual_posts')
  async findActualPosts(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
  ) {
    return this.postsService.findActualPosts({ page, perPage });
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
  async findRelatedPosts(
    @Param('slug') slug: string,
    @Query('page') page: number,
    @Query('perPage') perPage: number,
  ) {
    return this.postsService.findRelatedPosts(slug, { page: perPage });
  }
}
