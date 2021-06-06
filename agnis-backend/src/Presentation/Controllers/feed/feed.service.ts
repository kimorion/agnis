import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityService } from '../../../Infrastructure/Utils/EntityService';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, QueryFailedError, Repository } from 'typeorm';
import { CurrentUserService } from '../../../Application/Services/currentUser.service';
import { BlogSubscription } from '../../../Infrastructure/Entities/BlogSubscription';
import { PostgresErrorCodes } from '../../../Infrastructure/Utils/postgresErrorCodes';
import { DatabaseError } from 'pg-protocol';
import { Post } from '../../../Infrastructure/Entities/Post';

@Injectable()
export class FeedService extends EntityService<BlogSubscription> {
  constructor(
    @InjectRepository(BlogSubscription)
    private subscriptionRepository: Repository<BlogSubscription>,
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private readonly userService: CurrentUserService,
  ) {
    super(subscriptionRepository);
  }

  async subscribe(entity: DeepPartial<BlogSubscription>) {
    entity.user = { id: this.userService.getCurrentUser().id };

    return await super.create(entity).catch((error) => {
      if (error instanceof QueryFailedError) {
        const postgresError: DatabaseError = error as DatabaseError;
        if (
          postgresError &&
          postgresError.code ===
            PostgresErrorCodes.PG_UNIQUE_CONSTRAINT_VIOLATION
        ) {
          throw new BadRequestException('Подписка уже существует');
        }
      }
      throw error;
    });
  }

  async findSubscription(userId: string, blogId: string) {
    const result = await this.repository
      .createQueryBuilder()
      .select()
      .where('user_id = :userId and blog_id = :blogId', { userId, blogId })
      .getOne();

    if (result) return result;
    else throw new BadRequestException('Подписка отсутствует');
  }

  async unsubscribe(blogId: string) {
    const userId = this.userService.getCurrentUser().id;

    const original = await this.findSubscription(userId, blogId);

    return await super.remove(original.id).catch((error) => {
      if (error instanceof QueryFailedError) {
        const postgresError: DatabaseError = error as DatabaseError;
        if (
          postgresError &&
          postgresError.code ===
            PostgresErrorCodes.PG_UNIQUE_CONSTRAINT_VIOLATION
        ) {
          throw new BadRequestException('Такая подписка отсутствует');
        }
      }
      throw error;
    });
  }

  async getFeed(take: number, skip: number) {
    const userId = this.userService.getCurrentUser().id;

    const count = await this.postRepository
      .createQueryBuilder('p')
      .select()
      .innerJoin('blog', 'b', 'b.id = p.blog_id')
      .innerJoin('blog_subscription', 'bs', 'bs.blog_id = b.id')
      .where('bs.user_id = :userId and b.user_id != :userId', {
        userId: userId,
      })
      .getCount();

    const result = await this.postRepository
      .createQueryBuilder('p')
      .select()
      .innerJoin('blog', 'b', 'b.id = p.blog_id')
      .innerJoin('blog_subscription', 'bs', 'bs.blog_id = b.id')
      .where('bs.user_id = :userId and b.user_id != :userId', {
        userId: userId,
      })
      .orderBy('p.creationDate', 'DESC')
      .skip(skip)
      .take(take)
      .getMany();

    return { items: result, count: count };
  }
}
