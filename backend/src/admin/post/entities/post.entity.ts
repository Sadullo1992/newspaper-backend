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
  @ValidateIf((_, value) => value !== null)
  categoryId: string | null;

  @IsString()
  @IsNotEmpty()
  created_at: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  updated_at: string;

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
