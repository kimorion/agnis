import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../../Infrastructure/Entities/User';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityService } from '../../../Infrastructure/Utils/EntityService';

@Injectable()
export class UsersService extends EntityService<User> {
  constructor(@InjectRepository(User) repository: Repository<User>) {
    super(repository);
  }
}
