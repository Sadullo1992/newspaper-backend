import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Magazine } from './entities/magazine.entity';

@Injectable()
export class MagazineService extends DatabaseService<Magazine> {}
