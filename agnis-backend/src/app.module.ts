import { Module } from '@nestjs/common';
import { AppController } from './Presentation/Controllers/app.controller';
import { AppService } from './Application/Services/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
