import { Injectable } from '@nestjs/common';
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

  async findCategoryPosts(categoryId: string) {
    return this.prisma.post.findMany({
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
  }
}
