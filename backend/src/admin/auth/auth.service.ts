import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isMatchPassword } from 'src/helpers/hashPassword';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async login(loginUserDto: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { login: loginUserDto.login },
    });

    if (!user) throw new HttpException('User not found.', HttpStatus.FORBIDDEN);

    const isMatch = await isMatchPassword(loginUserDto.password, user.password);
    if (!isMatch)
      throw new HttpException('User not found.', HttpStatus.FORBIDDEN);

    const token = await this.jwtService.signAsync({
      userId: user.id,
      login: loginUserDto.login,
    });

    return { token };
  }
}
