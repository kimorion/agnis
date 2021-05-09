import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  content!: string;

  @IsNotEmpty()
  @IsUUID()
  toUserId!: string;
}
