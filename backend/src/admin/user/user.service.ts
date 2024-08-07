import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { genHashPassword, isMatchPassword } from 'src/helpers/hashPassword';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.tdo';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create({ login, password }: CreateUserDto) {
    const hash = await genHashPassword(password);
    const now = Date.now();

    const user = {
      login,
      password: hash,
      createdAt: now,
      updatedAt: now,
    };

    try {
      const userModel = await this.prisma.user.create({
        data: user,
        omit: { password: true },
      });
      return userModel;
    } catch (e) {
      throw new HttpException(
        'User login already exists!',
        HttpStatus.CONFLICT,
      );
    }
  }

  async findAll() {
    return await this.prisma.user.findMany({
      omit: {
        password: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
      omit: { password: true },
    });
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updatePasswordDto;

    const user = await this.prisma.user.findUnique({ where: { id } });

    const isMatch = await isMatchPassword(oldPassword, user.password);
    if (!isMatch)
      throw new HttpException('Old password is wrong', HttpStatus.FORBIDDEN);

    const hash = await genHashPassword(newPassword);

    const now = Date.now();

    const updateDto = {
      password: hash,
      updatedAt: now,
      version: user.version + 1,
    };

    return await this.prisma.user.update({
      where: { id },
      data: updateDto,
      omit: { password: true },
    });
  }

  async remove(id: string) {
    return await this.prisma.user.delete({ where: { id } });
  }
}
