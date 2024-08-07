import { Injectable, NotFoundException } from '@nestjs/common';
import {
  PaginateFunction,
  PaginateOptions,
  paginator,
} from 'src/helpers/paginator';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findAll({ page, perPage }: PaginateOptions) {
    const paginate: PaginateFunction = paginator({ page, perPage });

    const posts = paginate(this.prisma.post, {
      select: {
        id: true,
        title: true,
        slug: true,
        createdAt: true,
        updatedAt: true,
        views: true,
        images: true,
      },
    });

    return posts;
  }

  findFeaturedPosts({ page, perPage }: PaginateOptions) {
    const paginate: PaginateFunction = paginator({ page, perPage });

    const featuredPosts = paginate(this.prisma.post, {
      where: { isFeatured: true },
      select: {
        id: true,
        title: true,
        slug: true,
        createdAt: true,
        updatedAt: true,
        views: true,
        images: true,
      },
    });

    return featuredPosts;
  }

  findActualPosts({ page, perPage }: PaginateOptions) {
    const paginate: PaginateFunction = paginator({ page, perPage });

    const actualPosts = paginate(this.prisma.post, {
      where: { isActual: true },
      select: {
        id: true,
        title: true,
        slug: true,
        createdAt: true,
        updatedAt: true,
        views: true,
        images: true,
      },
    });

    return actualPosts;
  }

  async findBySlug(slug: string) {
    return this.prisma.post.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        slug: true,
        categoryId: true,
        content: true,
        author: true,
        images: true,
      },
    });
  }

  async findRelatedPosts(slug: string, { page, perPage }: PaginateOptions) {
    const post = await this.prisma.post.findUnique({
      where: { slug },
      select: { categoryId: true },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const paginate: PaginateFunction = paginator({ page, perPage });

    const relatedPosts = paginate(this.prisma.post, {
      where: { categoryId: post.categoryId },
      select: {
        id: true,
        title: true,
        slug: true,
        createdAt: true,
        updatedAt: true,
        views: true,
        images: true,
      },
    });

    return relatedPosts;
  }
}
