import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { BlogsService } from '../blogs/blogs.service';
import { CurrentUserService } from '../../../Application/Services/currentUser.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly blogService: BlogsService,
    private readonly currentUserService: CurrentUserService,
  ) {}

  @Get('current/blogs')
  async findUserBlogs(
    @Query('take') take: number,
    @Query('skip') skip: number,
  ) {
    return await this.blogService.findByCurrentUser(take, skip);
  }

  @Get('current')
  findCurrent() {
    return this.currentUserService.getCurrentUser();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Post('login')
  findOneByLogin(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto.login);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
