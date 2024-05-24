import { Module } from '@nestjs/common';
import { MagazinesService } from './magazines.service';
import { MagazinesController } from './magazines.controller';
import { MagazineModule } from 'src/admin/magazine/magazine.module';

@Module({
  imports: [MagazineModule],
  controllers: [MagazinesController],
  providers: [MagazinesService],
})
export class MagazinesModule {}
