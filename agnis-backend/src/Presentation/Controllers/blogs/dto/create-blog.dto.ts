import { Allow, IsNotEmpty } from 'class-validator';

export class CreateBlogDto {
  @IsNotEmpty()
  blogName!: string;

  @Allow()
  blogDescription!: string;
}
