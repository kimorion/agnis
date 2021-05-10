import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { MediaFilesService } from './media-files.service';
import { CreateMediaFileDto } from './dto/create-media-file.dto';
import { UpdateMediaFileDto } from './dto/update-media-file.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('media-files')
@Controller('media-files')
export class MediaFilesController {
  constructor(private readonly mediaFilesService: MediaFilesService) {}

  @Post()
  create(@Body() createMediaFileDto: CreateMediaFileDto) {
    return this.mediaFilesService.create(createMediaFileDto);
  }

  @Get()
  findAll() {
    return this.mediaFilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.mediaFilesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMediaFileDto: UpdateMediaFileDto,
  ) {
    return this.mediaFilesService.update(id, updateMediaFileDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.mediaFilesService.remove(id);
  }
}
