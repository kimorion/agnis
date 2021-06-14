import { NotFoundException } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class EntityService<TEntity> {
  constructor(protected readonly repository: Repository<TEntity>) {}

  async create(entity: DeepPartial<TEntity>) {
    return await this.repository.save(entity);
  }

  async findAll(
    relations: string[] | undefined = [],
    take: number | undefined = undefined,
    skip: number | undefined = undefined,
  ) {
    return await this.repository.find({
      relations: relations,
      take: take,
      skip: skip,
    });
  }

  async countAll(
    relations: string[] | undefined = [],
    take: number | undefined = undefined,
    skip: number | undefined = undefined,
  ) {
    return await this.repository.count({
      relations: relations,
      take: take,
      skip: skip,
    });
  }

  async findOne(id: string, relations: string[] | undefined = undefined) {
    const result = await this.repository.findOne(id, { relations: relations });
    if (!result) {
      throw new NotFoundException();
    }
    return result;
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
