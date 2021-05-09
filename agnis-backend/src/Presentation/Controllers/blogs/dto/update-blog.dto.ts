import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogDto } from './create-blog.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
  @IsUUID()
  user_id!: string;

  @IsNotEmpty()
  name!: string;
}
