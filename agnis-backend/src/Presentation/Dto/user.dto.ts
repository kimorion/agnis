import { Allow, IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  firstName!: string;

  @IsNotEmpty()
  lastName!: string;

  @Allow()
  birthDate?: Date;

  @Allow()
  bio?: string;
}
