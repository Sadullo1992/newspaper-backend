import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Query,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { Response } from 'express';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';
import { of } from 'rxjs';
import { Public } from 'src/admin/auth/public.decorator';
import { MagazinesService } from './magazines.service';

@Public()
@Controller()
export class MagazinesController {
  constructor(private readonly magazinesService: MagazinesService) {}

  @Get('magazines')
  async findAll(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
  ) {
    return await this.magazinesService.findAll({ page, perPage });
  }

  @Get('magazines/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const magazine = await this.magazinesService.findOne(id);

    if (!magazine) {
      throw new NotFoundException('Magazine not found');
    }

    return magazine;
  }

  @Get('magazines/:id/download')
  async download(
    @Param('id', ParseUUIDPipe) id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const magazine = await this.magazinesService.findOne(id);

    if (!magazine) {
      throw new NotFoundException('Magazine not found');
    }

    const filePath = join(process.cwd(), `/uploads/magazines/${magazine.id}`);

    if (!existsSync(filePath)) {
      throw new NotFoundException('Magazine file was not found');
    }

    await this.magazinesService.addDownloadCount(id);

    const stream = createReadStream(filePath);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=${magazine.filename}`,
    });
    return new StreamableFile(stream);
  }

  @Get('media/magazines/:filename')
  async view(@Param('filename') filename: string, @Res() res: Response) {
    const magazineId = await this.magazinesService.findMagazineId(filename);

    const filePath = join(process.cwd(), `/uploads/magazines/${magazineId}`);
    if (existsSync(filePath)) {
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename=${filename}`,
      });
      return of(res.sendFile(filePath));
    }

    throw new NotFoundException('Magazine file not found');
  }
}
