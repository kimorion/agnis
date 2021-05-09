import { Controller, Get } from '@nestjs/common';
import { AppService } from '../../Application/Services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getTest(): string {
    return this.appService.getTest();
  }
}
