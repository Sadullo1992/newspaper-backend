import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.post.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        createdAt: true,
        updatedAt: true,
        views: true,
      },
    });
  }

  findFeaturedPosts() {
    return this.prisma.post.findMany({
      where: { isFeatured: true },
      select: {
        id: true,
        title: true,
        slug: true,
        createdAt: true,
        updatedAt: true,
        views: true,
      },
    });
  }

  findActualPosts() {
    return this.prisma.post.findMany({
      where: { isActual: true },
      select: {
        id: true,
        title: true,
        slug: true,
        createdAt: true,
        updatedAt: true,
        views: true,
      },
    });
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
      },
    });
  }

  async findRelatedPosts(slug: string) {
    const post = await this.prisma.post.findUnique({
      where: { slug },
      select: { categoryId: true },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return this.prisma.post.findMany({
      where: { categoryId: post.categoryId },
      select: {
        id: true,
        title: true,
        slug: true,
        createdAt: true,
        updatedAt: true,
        views: true,
      },
    });
  }
}
