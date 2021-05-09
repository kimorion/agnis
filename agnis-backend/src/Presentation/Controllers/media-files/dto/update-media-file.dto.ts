import { PartialType } from '@nestjs/mapped-types';
import { CreateMediaFileDto } from './create-media-file.dto';
import { Allow, IsNotEmpty } from 'class-validator';

export class UpdateMediaFileDto extends PartialType(CreateMediaFileDto) {
  @IsNotEmpty()
  createdAt!: Date;

  @Allow()
  name?: string;
}
