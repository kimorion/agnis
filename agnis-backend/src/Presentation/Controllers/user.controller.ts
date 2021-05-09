import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from '../../Application/Services/users.service';
import { User } from '../../Infrastructure/Entities/User';
import { UserDto } from '../Dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Post()
  async addUser(@Body() request: UserDto): Promise<string> {
    return this.userService.add(request);
  }
}
