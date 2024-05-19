import { IsUUID, IsString, IsNotEmpty } from 'class-validator';

export class Category {
  @IsUUID('4')
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  slug: string;
}
