import { PickType } from '@nestjs/mapped-types';
import { Magazine } from '../entities/magazine.entity';

export class CreateMagazineDto extends PickType(Magazine, [
  'name',
  'createdAt',
] as const) {}
