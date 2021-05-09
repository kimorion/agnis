import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../Infrastructure/Entities/User';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from '../../Presentation/Dto/user.dto';
import { v4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User | undefined> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async add(request: UserDto): Promise<string> {
    const user: User = { id: v4(), ...request };
    user.id = v4();

    await this.usersRepository.save(user);
    return user.id;
  }
}
