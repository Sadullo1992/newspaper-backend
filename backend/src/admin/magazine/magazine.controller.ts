import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Put,
  ParseUUIDPipe,
  NotFoundException,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { MagazineService } from './magazine.service';
import { CreateMagazineDto } from './dto/create-magazine.dto';
import { UpdateMagazineDto } from './dto/update-magazine.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('admin/magazine')
export class MagazineController {
  constructor(private readonly magazineService: MagazineService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('magazine-file', {
      storage: diskStorage({
        destination: './uploads/magazines',
        filename: (req, file, cb) => cb(null, uuid()),
      }),
    }),
  )
  @HttpCode(HttpStatus.CREATED)
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5000000 }),
          new FileTypeValidator({ fileType: /(pdf)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() createMagazineDto: CreateMagazineDto,
  ) {
    const { name, createdAt } = createMagazineDto;
    const { originalname, filename, size } = file;
    return this.magazineService.create({
      id: filename,
      filename: originalname,
      name,
      createdAt,
      size,
    });
  }

  @Get()
  findAll() {
    return this.magazineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    const magazine = this.magazineService.findOne(id);

    if (!magazine) {
      throw new NotFoundException('Magazine not found');
    }

    return magazine;
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMagazineDto: UpdateMagazineDto,
  ) {
    const magazine = this.magazineService.findOne(id);

    if (!magazine) {
      throw new NotFoundException('Magazine not found');
    }

    return this.magazineService.update(id, updateMagazineDto);
  }

  // @Delete(':id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // remove(@Param('id', ParseUUIDPipe) id: string) {
  //   const magazine = this.magazineService.findOne(id);

  //   if (!magazine) {
  //     throw new NotFoundException('Magazine not found');
  //   }

  //   this.magazineService.remove(id);
  // }
}
