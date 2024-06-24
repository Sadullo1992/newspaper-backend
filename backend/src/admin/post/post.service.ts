import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    try {
      const now = Date.now();

      const post = await this.prisma.post.create({
        data: {
          ...createPostDto,
          createdAt: now,
          updatedAt: now,
        },
      });

      return post;
    } catch (e) {
      throw new HttpException('Post slug already exists!', HttpStatus.CONFLICT);
    }
  }

  async findAll() {
    return this.prisma.post.findMany();
  }

  async findOne(id: string) {
    return this.prisma.post.findUnique({ where: { id } });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return this.prisma.post.update({
      where: { id },
      data: {
        ...updatePostDto,
        updatedAt: Date.now(),
      },
    });
  }

  async remove(id: string) {
    return this.prisma.post.delete({ where: { id } });
  }
}
