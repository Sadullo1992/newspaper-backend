import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService extends DatabaseService<Category> {}
