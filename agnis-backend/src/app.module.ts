import { Module } from '@nestjs/common';
import { AppController } from './Presentation/Controllers/app.controller';
import { AppService } from './Application/Services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './Presentation/Controllers/user.controller';
import { UsersService } from './Application/Services/users.service';
import * as ormconfig from './../ormconfig';
import { User } from './Infrastructure/Entities/User';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), TypeOrmModule.forFeature([User])],
  controllers: [AppController, UserController],
  providers: [AppService, UsersService],
})
export class AppModule {}
