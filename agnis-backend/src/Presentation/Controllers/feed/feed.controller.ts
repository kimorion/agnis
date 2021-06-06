import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { FeedService } from './feed.service';
import { ApiTags } from '@nestjs/swagger';
import { SubscriptionRequestDto } from './dto/subscriptionRequest.dto';
import { query } from 'express';

@ApiTags('feed')
@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  getFeed(@Query('take') take: number, @Query('skip') skip: number) {
    return this.feedService.getFeed(take, skip);
  }

  @Post()
  subscribe(@Body() subscriptionRequest: SubscriptionRequestDto) {
    return this.feedService.subscribe({
      blog: { id: subscriptionRequest.blogId },
    });
  }

  @Delete(':blogId')
  unsubscribe(@Param('blogId', ParseUUIDPipe) blogId: string) {
    return this.feedService.unsubscribe(blogId);
  }
}
