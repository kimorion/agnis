import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CurrentUserService } from '../Services/currentUser.service';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  constructor(private readonly userService: CurrentUserService) {
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const authorizationToken = req.header('Authorization');

    if (authorizationToken) {
      await this.userService.setCurrentUser(authorizationToken);
    }

    next();
  }
}
