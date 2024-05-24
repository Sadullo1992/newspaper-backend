import { IsUUID, IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class Magazine {
  @IsUUID('4')
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  created_at: string;

  @IsString()
  @IsNotEmpty()
  file: string;

  @IsString()
  @IsNotEmpty()
  hajmi: string;

  @IsNumber()
  downloads_count: number;
}
