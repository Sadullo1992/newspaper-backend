import { Type } from 'class-transformer';
import {
  IsUUID,
  IsString,
  IsNotEmpty,
  IsBoolean,
  ValidateIf,
  IsArray,
  ValidateNested,
  ArrayMaxSize,
} from 'class-validator';

export class Post {
  @IsUUID('4')
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsNotEmpty()
  @IsString()
  @ValidateIf((_, value) => value !== null)
  categoryId: string | null;

  @IsString()
  @IsNotEmpty()
  content: string;

  createdAt: number;

  updatedAt: number;

  @IsBoolean()
  isActual: boolean;

  @IsBoolean()
  isFeatured: boolean;

  views: number;

  @IsNotEmpty()
  @IsString()
  @ValidateIf((_, value) => value !== null)
  author: string | null;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMaxSize(3)
  @Type(() => Image)
  images: Image[];
}

export class Image {
  id: string;
  imagename: string;
}
