import { Injectable, NotFoundException } from '@nestjs/common';
import { MagazineService } from 'src/admin/magazine/magazine.service';

@Injectable()
export class MagazinesService {
  constructor(private magazineService: MagazineService) {}

  findAll() {
    return this.magazineService.findAll();
  }

  addDownloadCount(id: string) {
    const magazine = this.magazineService.findOne(id);

    if (!magazine) {
      throw new NotFoundException('Magazine not found');
    }

    return this.magazineService.update(id, {
      downloads_count: magazine.downloads_count + 1,
    });
  }
}
