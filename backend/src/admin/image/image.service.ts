import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ImageService {
  constructor(private prisma: PrismaService) {}

  async checkExistFileInDB(imagename: string): Promise<boolean> {
    const isExist = await this.prisma.image.findUnique({
      select: { id: true },
      where: { imagename },
    });
    return !!isExist;
  }

  async saveImage(imagename: string, id: string, imageSize: number) {
    try {
      const imageModel = await this.prisma.image.create({
        data: {
          id,
          imagename,
          imageSize,
          postId: null,
        },
      });
      return { id: imageModel.id, imagename: imageModel.imagename };
    } catch (e) {
      throw new HttpException('Image already exists!', HttpStatus.CONFLICT);
    }
  }

  async findImageId(imagename: string) {
    const modelImage = await this.prisma.image.findUnique({
      where: { imagename },
    });

    if (!modelImage) {
      throw new HttpException('Image was not founded!', HttpStatus.NOT_FOUND);
    }

    return modelImage.id as string;
  }
}
