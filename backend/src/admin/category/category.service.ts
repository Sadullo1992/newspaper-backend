import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  PaginatedResult,
  PaginateFunction,
  PaginateOptions,
  paginator,
} from 'src/helpers/paginator';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.prisma.category.create({
        data: createCategoryDto,
      });
      return category;
    } catch (e) {
      throw new HttpException(
        'Category slug already exists!',
        HttpStatus.CONFLICT,
      );
    }
  }

  async findAll({
    page,
    perPage,
  }: PaginateOptions) {
    const paginate: PaginateFunction = paginator({ page, perPage });
    return paginate(this.prisma.category);
  }

  async findOne(id: string) {
    return this.prisma.category.findUnique({ where: { id } });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: string) {
    await this.prisma.category.delete({ where: { id } });

    const posts = await this.prisma.post.findMany();

    const categoryPosts = posts.filter((post) => post.categoryId === id);

    categoryPosts.forEach((post) => {
      post.categoryId = null;
    });
  }
}
