import {
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  MaxFileSizeValidator,
  NotFoundException,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { existsSync } from 'fs';
import { rm } from 'fs/promises';
import { diskStorage } from 'multer';
import { join } from 'path';
import { of } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { ImageService } from './image.service';

@Controller()
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload/image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/images',
        filename: (req, file, cb) => cb(null, uuid()),
      }),
    }),
  )
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2000000 }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|gif)$/ }),
        ],
      }),
    )
    image: Express.Multer.File,
  ) {
    const { originalname, filename, size } = image;

    const isExist = await this.imageService.checkExistFileInDB(originalname);
    if (isExist) {
      const filePath = join(process.cwd(), `/uploads/images/${filename}`);
      await rm(filePath);

      throw new HttpException('Image already exists!', HttpStatus.CONFLICT);
    }

    return await this.imageService.saveImage(originalname, filename, size);
  }

  @Get('media/images/:imagename')
  async download(@Param('imagename') imagename: string, @Res() res: Response) {
    const imageId = await this.imageService.findImageId(imagename);

    const filePath = join(process.cwd(), `/uploads/images/${imageId}`);
    if (existsSync(filePath)) {
      res.set({
        'Content-Type': 'image/jpg',
        'Content-Disposition': `inline; filename=${imagename}`,
      });

      return of(res.sendFile(filePath));
    }

    throw new NotFoundException('Image file not found');
  }

  @Delete('media/images/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const image = await this.imageService.findOne(id);

    if (!image) {
      throw new NotFoundException('Image not found');
    }

    await this.imageService.remove(id);

    const filePath = join(process.cwd(), `/uploads/images/${id}`);
    await rm(filePath);
  }
}
