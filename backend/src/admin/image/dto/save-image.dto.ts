import { IsNotEmpty, IsUUID } from "class-validator";

export class SaveImageDto {
  @IsUUID()
  @IsNotEmpty()
  readonly postId!: string;
}
