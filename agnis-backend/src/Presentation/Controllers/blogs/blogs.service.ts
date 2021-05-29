import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityService } from '../../../Infrastructure/Utils/EntityService';
import { Blog } from '../../../Infrastructure/Entities/Blog';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, QueryFailedError, Repository } from 'typeorm';
import { PostgresErrorCodes } from '../../../Infrastructure/Utils/postgresErrorCodes';
import { DatabaseError } from 'pg-protocol';

@Injectable()
export class BlogsService extends EntityService<Blog> {
  constructor(@InjectRepository(Blog) repository: Repository<Blog>) {
    super(repository);
  }

  async create(entity: DeepPartial<Blog>) {
    return await super.create(entity).catch((error) => {
      if (error instanceof QueryFailedError) {
        const postgresError: DatabaseError = error as DatabaseError;
        if (
          postgresError &&
          postgresError.code ===
          PostgresErrorCodes.PG_UNIQUE_CONSTRAINT_VIOLATION
        ) {
          throw new BadRequestException('Блог с таким имененем уже существует');
        }
      }
      throw error;
    });
  }

  async findByUserId(userId: string) {
    return await this.repository
      .find({ where: { user: { id: userId } } })
      .catch((error) => {
        if (error instanceof QueryFailedError) {
          const postgresError: DatabaseError = error as DatabaseError;
          if (postgresError) {
            throw new BadRequestException(
              'Такой пользователь не найден',
            );
          }
        }
        throw error;
      });
  }
}
