import { IsUUID, IsString, IsNotEmpty } from 'class-validator';

export class Magazine {
  @IsUUID('4')
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  createdAt: number;

  filename: string;

  size: number;
}
