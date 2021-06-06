import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  content!: string;

  @IsUUID()
  @IsNotEmpty()
  blogId!: string;

  @IsArray()
  tags?: string[];
}
