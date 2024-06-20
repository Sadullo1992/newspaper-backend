import {
  IsUUID,
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsNumber,
  ValidateIf,
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
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  createdAt: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  updatedAt: string;

  @IsBoolean()
  isActual: boolean;

  @IsBoolean()
  isFeatured: boolean;

  @IsNumber()
  @IsNotEmpty()
  views: number;

  @IsNotEmpty()
  @IsString()
  @ValidateIf((_, value) => value !== null)
  author: string | null;
}
