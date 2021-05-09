import { User } from '../../Infrastructure/Entities/User';
import { IsNotEmpty } from 'class-validator';

export class UserDto implements Partial<User> {
  @IsNotEmpty()
  firstName!: string;

  @IsNotEmpty()
  lastName!: string;

  birthDate?: Date;
  bio?: string;
}
