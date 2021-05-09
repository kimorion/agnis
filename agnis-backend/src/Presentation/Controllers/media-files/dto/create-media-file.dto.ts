import { Allow, IsNotEmpty } from 'class-validator';

export class CreateMediaFileDto {
  @IsNotEmpty()
  createdAt!: Date;

  @Allow()
  name?: string;
}
