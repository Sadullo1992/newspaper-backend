import { PartialType } from '@nestjs/mapped-types';
import { CreateImageDto } from './save-image.dto';

export class UpdateImageDto extends PartialType(CreateImageDto) {}
