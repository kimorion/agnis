import { IsNotEmpty } from 'class-validator';

export class SubscriptionRequestDto {
  @IsNotEmpty()
  blogId!: string;
}
