import { Injectable } from '@nestjs/common';
import {
  PaginateFunction,
  PaginateOptions,
  paginator,
} from 'src/helpers/paginator';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.category.findMany();
  }

  async findOne(slug: string) {
    return this.prisma.category.findUnique({ where: { slug } });
  }

  async findCategoryPosts(
    categoryId: string,
    { page, perPage }: PaginateOptions,
  ) {
    const paginate: PaginateFunction = paginator({ page, perPage });

    const categoryPosts = paginate(this.prisma.post, {
      where: { categoryId },
      select: {
        id: true,
        title: true,
        slug: true,
        createdAt: true,
        updatedAt: true,
        views: true,
      },
    });

    return categoryPosts;
  }
}
