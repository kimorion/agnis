import { Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { User } from '../../Infrastructure/Entities/User';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export class CurrentUserService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {
  }

  private currentUser!: User;

  async setCurrentUser(userId: string) {
    const result = await this.repository
      .createQueryBuilder()
      .select()
      .where('id = :id', { id: userId })
      .getOne();

    if (!result) {
      throw new UnauthorizedException('Неверный id');
    }
    this.currentUser = result;
  }

  getCurrentUser(): User {

    if (!this.currentUser) {
      throw new UnauthorizedException('Пользователь не авторизован');
    }

    return this.currentUser;
  }
}
