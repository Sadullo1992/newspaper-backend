import {
  Body,
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
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { rename, rm } from 'fs/promises';
import { diskStorage } from 'multer';
import { join } from 'path';
import { v4 as uuid } from 'uuid';
import { CreateMagazineDto } from './dto/create-magazine.dto';
import { UpdateMagazineDto } from './dto/update-magazine.dto';
import { MagazineService } from './magazine.service';

@Controller('admin/magazine')
export class MagazineController {
  constructor(private readonly magazineService: MagazineService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('magazineFile', {
      storage: diskStorage({
        destination: './uploads/magazines',
        filename: (req, file, cb) => cb(null, uuid()),
      }),
    }),
  )
  @HttpCode(HttpStatus.CREATED)
  async create(
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

    const isExist = await this.magazineService.checkExistFileInDB(originalname);
    if (isExist) {
      const filePath = join(process.cwd(), `/uploads/magazines/${filename}`);
      await rm(filePath);

      throw new HttpException('Magazine already exists!', HttpStatus.CONFLICT);
    }

    return await this.magazineService.create({
      id: filename,
      filename: originalname,
      name,
      createdAt: Number(createdAt),
      size,
    });
  }

  @Get()
  findAll(@Query('page') page: number, @Query('perPage') perPage: number) {
    return this.magazineService.findAll({ page, perPage });
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const magazine = await this.magazineService.findOne(id);

    if (!magazine) {
      throw new NotFoundException('Magazine not found');
    }

    return magazine;
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('magazineFile', {
      storage: diskStorage({
        destination: './uploads/magazines',
      }),
    }),
  )
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMagazineDto: UpdateMagazineDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5000000 }),
          new FileTypeValidator({ fileType: /(pdf)$/ }),
        ],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
  ) {
    const magazine = await this.magazineService.findOne(id);

    if (!magazine) {
      throw new NotFoundException('Magazine not found');
    }

    const updateDto =
      'createdAt' in updateMagazineDto
        ? {
            ...updateMagazineDto,
            createdAt: Number(updateMagazineDto.createdAt),
          }
        : { ...updateMagazineDto };

    if (!file) {
      return this.magazineService.update(id, updateDto);
    }

    const { originalname, filename, size } = file;

    const oldFilePath = join(process.cwd(), `/uploads/magazines/${id}`);
    const newFilePath = join(process.cwd(), `/uploads/magazines/${filename}`);
    await rm(oldFilePath);
    await rename(newFilePath, oldFilePath);

    return await this.magazineService.update(id, {
      ...updateDto,
      filename: originalname,
      size,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const magazine = await this.magazineService.findOne(id);

    if (!magazine) {
      throw new NotFoundException('Magazine not found');
    }

    await this.magazineService.remove(id);

    const filePath = join(process.cwd(), `/uploads/magazines/${id}`);
    await rm(filePath);
  }
}
