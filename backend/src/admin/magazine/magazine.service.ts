import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateMagazineDto } from './dto/update-magazine.dto';
import { Magazine } from './entities/magazine.entity';

@Injectable()
export class MagazineService {
  constructor(private prisma: PrismaService) {}

  async create(magazine: Magazine) {
    try {
      return await this.prisma.magazine.create({
        data: {
          ...magazine,
          createdAt: new Date(Number(magazine.createdAt)).getTime(),
        },
      });
    } catch (e) {
      throw new HttpException(
        'Magazine file already exists!',
        HttpStatus.CONFLICT,
      );
    }
  }

  async findAll() {
    return await this.prisma.magazine.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.magazine.findUnique({ where: { id } });
  }

  async update(id: string, updateMagazineDto: UpdateMagazineDto) {}
}
