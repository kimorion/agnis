import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateBlogDto {
  @IsUUID()
  user_id!: string;

  @IsNotEmpty()
  name!: string;
}
