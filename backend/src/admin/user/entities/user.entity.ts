import { IsNotEmpty, IsString } from 'class-validator';

export class User {
  id: string;

  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  version: number;

  createdAt: number;

  updatedAt: number;
}
