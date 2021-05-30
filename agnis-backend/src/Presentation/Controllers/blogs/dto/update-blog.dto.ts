import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogDto } from './create-blog.dto';
import { IsNotEmpty, IsUUID, MaxLength } from 'class-validator';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
  @IsUUID()
  user_id!: string;

  @IsNotEmpty()
  name!: string;

  @MaxLength(400)
  blogDescription!: string;
}
