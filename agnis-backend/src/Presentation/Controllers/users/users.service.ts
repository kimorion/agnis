import { BadRequestException, Injectable } from '@nestjs/common';
import { DeepPartial, QueryFailedError, Repository } from 'typeorm';
import { User } from '../../../Infrastructure/Entities/User';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityService } from '../../../Infrastructure/Utils/EntityService';
import { DatabaseError } from 'pg-protocol';
import { PostgresErrorCodes } from '../../../Infrastructure/Utils/postgresErrorCodes';

@Injectable()
export class UsersService extends EntityService<User> {
  constructor(@InjectRepository(User) repository: Repository<User>) {
    super(repository);
  }

  async create(entity: DeepPartial<User>) {
    return await super.create(entity).catch((error) => {
      if (error instanceof QueryFailedError) {
        const postgresError: DatabaseError = error as DatabaseError;
        if (
          postgresError &&
          postgresError.code ===
          PostgresErrorCodes.PG_UNIQUE_CONSTRAINT_VIOLATION
        ) {
          throw new BadRequestException(
            'Пользователь с данным логином уже существует',
          );
        }
      }
      throw error;
    });
  }

  async login(login: string) {
    const result = await this.repository
      .createQueryBuilder()
      .select()
      .where('login = :login', { login })
      .getOne();

    if (result) return result;
    else throw new BadRequestException('Неверный логин');
  }
}
