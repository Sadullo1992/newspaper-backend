import { Injectable, NotFoundException } from '@nestjs/common';
import {
  PaginateFunction,
  PaginateOptions,
  paginator,
} from 'src/helpers/paginator';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MagazinesService {
  constructor(private prisma: PrismaService) {}

  async findAll({ page, perPage }: PaginateOptions) {
    const paginate: PaginateFunction = paginator({ page, perPage });

    return paginate(this.prisma.magazine);
  }

  async findOne(id: string) {
    return await this.prisma.magazine.findUnique({ where: { id } });
  }

  async addDownloadCount(id: string) {
    return await this.prisma.magazine.update({
      where: { id },
      data: { downloadsCount: { increment: 1 } },
    });
  }

  async findMagazineId(filename: string) {
    const modelMagazine = await this.prisma.magazine.findUnique({
      where: { filename },
    });

    if (!modelMagazine) {
      throw new NotFoundException('Magazine not found');
    }

    return modelMagazine.id as string;
  }
}
