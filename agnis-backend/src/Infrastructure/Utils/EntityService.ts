import { BadRequestException, NotFoundException } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

const PG_UNIQUE_CONSTRAINT_VIOLATION = '23505';

export class EntityService<TEntity> {
  constructor(protected readonly repository: Repository<TEntity>) {}

  async create(entity: DeepPartial<TEntity>) {
    return await this.repository.save(entity).catch((err) => {
      if (err.code === PG_UNIQUE_CONSTRAINT_VIOLATION)
        throw new BadRequestException(err);
      throw err;
    });
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: string) {
    return (await this.repository.findOne(id)) ?? new NotFoundException();
  }

  async update(id: string, entityDto: QueryDeepPartialEntity<TEntity>) {
    const result = await this.repository.update(id, entityDto);
    if (result.affected == 0) throw new NotFoundException();
    return result.affected;
  }

  async remove(id: string) {
    const result = await this.repository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();

    if (result.affected === 0) throw new NotFoundException();

    return result;
  }
}
