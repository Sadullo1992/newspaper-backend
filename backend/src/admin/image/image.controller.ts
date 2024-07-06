import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Param,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { existsSync } from 'fs';
import { Response } from 'express';
import { of } from 'rxjs';

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

    return this.imageService.saveImage(originalname, filename, size);
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
}
