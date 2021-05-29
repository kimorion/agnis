import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateBlogDto {
  @IsUUID()
  userId!: string;

  @IsNotEmpty()
  blogName!: string;
}
