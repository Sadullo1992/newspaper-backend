import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { v4 as uuid } from 'uuid';
import { PaginateFunction, PaginateOptions, paginator } from 'src/helpers/paginator';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create({ images, ...restPostDto }: CreatePostDto) {
    const id = uuid();
    try {
      const now = Date.now();

      const post = await this.prisma.post.create({
        data: {
          ...restPostDto,
          id,
          createdAt: now,
          updatedAt: now,
        },
      });

      images.forEach(
        async (item) =>
          await this.prisma.image.update({
            where: {
              id: item.id,
            },
            data: { postId: id },
          }),
      );

      return post;
    } catch (e) {
      throw new HttpException(
        'Please check the entities!',
        HttpStatus.CONFLICT,
      );
    }
  }

  async findAll({ page, perPage }: PaginateOptions) {
    const paginate: PaginateFunction = paginator({ page, perPage });

    return paginate(this.prisma.post, { include: { images: true } });
  }

  async findOne(id: string) {
    return this.prisma.post.findUnique({ where: { id } });
  }

  async update(id: string, { images, ...updatePostDto }: UpdatePostDto) {
    return this.prisma.post.update({
      where: { id },
      data: {
        ...updatePostDto,
        updatedAt: Date.now(),
      },
    });
  }

  async remove(id: string) {
    await this.prisma.image.deleteMany({ where: { postId: id } });

    return await this.prisma.post.delete({ where: { id } });
  }

  async findPostImages(postId: string) {
    return await this.prisma.image.findMany({ where: { postId } });
  }
}
