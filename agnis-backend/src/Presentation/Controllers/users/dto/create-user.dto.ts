import { Allow, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @Allow()
  firstName!: string;

  @Allow()
  lastName!: string;

  @IsNotEmpty()
  @IsString()
  login!: string;

  @Allow()
  birthDate?: Date;

  @Allow()
  bio?: string;
}
