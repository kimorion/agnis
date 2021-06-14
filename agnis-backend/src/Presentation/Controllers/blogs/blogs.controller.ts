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
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('blogs')
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogsService.create({
      name: createBlogDto.blogName,
      description: createBlogDto.blogDescription,
    });
  }

  @Get()
  async findAll(
    @Query('take') take: number,
    @Query('skip') skip: number,
    @Query('name') name: string,
  ) {
    const result = await this.blogsService.findAll(
      ['user', 'subscriptions'],
      take,
      skip,
      name,
    );
    const count = await this.blogsService.countAll();
    return { items: result, count: count };
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.blogsService.findOne(id, [
      'posts',
      'user',
      'subscriptions',
      'subscriptions.user',
    ]);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBlogDto: UpdateBlogDto,
  ) {
    return this.blogsService.update(id, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.blogsService.remove(id);
  }
}
