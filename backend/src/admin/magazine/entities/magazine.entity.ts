import { IsUUID, IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class Magazine {
  @IsUUID('4')
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  createdAt: string;

  filename: string;

  size: number;
}
