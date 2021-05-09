import { Module } from '@nestjs/common';
import { AppController } from './Presentation/Controllers/app.controller';
import { AppService } from './Application/Services/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
