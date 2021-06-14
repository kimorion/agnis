import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EntityService } from '../../../Infrastructure/Utils/EntityService';
import { Blog } from '../../../Infrastructure/Entities/Blog';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, ILike, QueryFailedError, Repository } from 'typeorm';
import { PostgresErrorCodes } from '../../../Infrastructure/Utils/postgresErrorCodes';
import { DatabaseError } from 'pg-protocol';
import { CurrentUserService } from '../../../Application/Services/currentUser.service';

@Injectable()
export class BlogsService extends EntityService<Blog> {
  constructor(
    @InjectRepository(Blog) repository: Repository<Blog>,
    private readonly userService: CurrentUserService,
  ) {
    super(repository);
  }

  async findAll(
    relations: string[] | undefined = undefined,
    take: number | undefined = undefined,
    skip: number | undefined = undefined,
    name: string | undefined = undefined,
  ): Promise<Blog[]> {
    const currentUserId = this.userService.getCurrentUser().id;

    let result = await this.repository.find({
      relations: relations?.concat(['subscriptions.user']),
      take: take,
      skip: skip,
      where: !!name ? { name: ILike(`%${name}%`) } : undefined,
      order: { name: 'ASC' },
    });

    result = result.map((r) => {
      const isSubscribed = r.subscriptions.some(
        (e) => e.user.id === currentUserId,
      );
      return { ...r, isSubscribed };
    });

    return result;
  }

  async findOne(id: string, relations: string[] | undefined = undefined) {
    const result = await super.findOne(id, relations);
    const currentUserId = this.userService.getCurrentUser().id;

    const isSubscribed =
      result.subscriptions?.some((e) => e?.user?.id === currentUserId) ?? false;
    return { ...result, isSubscribed };
  }

  async create(entity: DeepPartial<Blog>) {
    entity.user = { id: this.userService.getCurrentUser().id };

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
            throw new BadRequestException('Такой пользователь не найден');
          }
        }
        throw error;
      });
  }

  async findByCurrentUser(take: number, skip: number) {
    const currentUserId = this.userService.getCurrentUser().id;

    const result = await this.repository
      .findAndCount({
        where: { user: { id: currentUserId } },
        relations: ['user', 'subscriptions', 'subscriptions.user'],
        take: take,
        skip: skip,
        order: { name: 'ASC' },
      })
      .catch((error) => {
        if (error instanceof QueryFailedError) {
          const postgresError: DatabaseError = error as DatabaseError;
          if (postgresError) {
            throw new BadRequestException(postgresError.message);
          }
        }
        throw error;
      });

    const blogs = result[0].map((r) => {
      const isSubscribed = r.subscriptions.some(
        (e) => e.user.id === currentUserId,
      );
      return { ...r, isSubscribed };
    });
    const count = result[1];

    return { items: blogs, count: count };
  }
}
