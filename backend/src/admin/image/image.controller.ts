import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ImageService } from './image.service';
import { UpdateImageDto } from './dto/update-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { SaveImageDto } from './dto/save-image.dto';
import { diskStorage } from 'multer';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/images',
        filename: (req, file, cb) => cb(null, uuid()),
      }),
    }),
  )
  uploadImage(
    @UploadedFile() image: Express.Multer.File,
    @Body() body: SaveImageDto,
  ) {
    const { postId } = body;
    const { originalname, filename, size } = image;

    return this.imageService;
  }

}
