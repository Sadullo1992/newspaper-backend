import {
  IsUUID,
  IsString,
  IsNotEmpty,
  IsBoolean,
  ValidateIf,
  IsInt,
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
}
