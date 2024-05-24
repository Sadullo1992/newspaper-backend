import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { MagazinesService } from './magazines.service';

@Controller('magazines')
export class MagazinesController {
  constructor(private readonly magazinesService: MagazinesService) {}

  @Get()
  findAll() {
    return this.magazinesService.findAll();
  }

  @Get(':id/download')
  addDownloadCount(@Param('id', ParseUUIDPipe) id: string) {
    return this.magazinesService.addDownloadCount(id);
  }
}
