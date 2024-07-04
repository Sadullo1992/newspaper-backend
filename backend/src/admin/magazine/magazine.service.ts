import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PaginateFunction, PaginateOptions, paginator } from 'src/helpers/paginator';
import { PrismaService } from 'src/prisma/prisma.service';
import { Magazine } from './entities/magazine.entity';

@Injectable()
export class MagazineService {
  constructor(private prisma: PrismaService) {}

  async create(magazine: Magazine) {
    try {
      return await this.prisma.magazine.create({
        data: magazine,
      });
    } catch (e) {
      throw new HttpException(
        'Magazine file already exists!',
        HttpStatus.CONFLICT,
      );
    }
  }

  async findAll({ page, perPage }: PaginateOptions) {
    const paginate: PaginateFunction = paginator({ page, perPage });
    return paginate(this.prisma.magazine);
  }

  async findOne(id: string) {
    return await this.prisma.magazine.findUnique({ where: { id } });
  }

  async update(id: string, updateMagazineDto: Partial<Omit<Magazine, 'id'>>) {
    return await this.prisma.magazine.update({
      where: { id },
      data: updateMagazineDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.magazine.delete({ where: { id } });
  }
}
