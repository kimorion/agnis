import { MiddlewareConsumer, Module, NestModule, Scope } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from './../ormconfig';
import { User } from './Infrastructure/Entities/User';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { UsersController } from './Presentation/Controllers/users/users.controller';
import { TagsController } from './Presentation/Controllers/tags/tags.controller';
import { RolesController } from './Presentation/Controllers/roles/roles.controller';
import { PostsController } from './Presentation/Controllers/posts/posts.controller';
import { PermissionsController } from './Presentation/Controllers/permissions/permissions.controller';
import { MessagesController } from './Presentation/Controllers/messages/messages.controller';
import { MediaFilesController } from './Presentation/Controllers/media-files/media-files.controller';
import { CommentController } from './Presentation/Controllers/comment/comment.controller';
import { BlogsController } from './Presentation/Controllers/blogs/blogs.controller';
import { TagsService } from './Presentation/Controllers/tags/tags.service';
import { RolesService } from './Presentation/Controllers/roles/roles.service';
import { PostsService } from './Presentation/Controllers/posts/posts.service';
import { PermissionsService } from './Presentation/Controllers/permissions/permissions.service';
import { MessagesService } from './Presentation/Controllers/messages/messages.service';
import { MediaFilesService } from './Presentation/Controllers/media-files/media-files.service';
import { CommentService } from './Presentation/Controllers/comment/comment.service';
import { BlogsService } from './Presentation/Controllers/blogs/blogs.service';
import { UsersService } from './Presentation/Controllers/users/users.service';
import { Blog } from './Infrastructure/Entities/Blog';
import { CurrentUserService } from './Application/Services/currentUser.service';
import { AuthorizationMiddleware } from './Application/Middleware/authorizationMiddleware.service';
import { Post } from './Infrastructure/Entities/Post';
import { FeedController } from './Presentation/Controllers/feed/feed.controller';
import { BlogSubscription } from './Infrastructure/Entities/BlogSubscription';
import { FeedService } from './Presentation/Controllers/feed/feed.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    TypeOrmModule.forFeature([User, Blog, Post, BlogSubscription]),
    AutomapperModule.forRoot({
      options: [{ name: 'Mapper', pluginInitializer: classes }],
    }),
  ],
  controllers: [
    UsersController,
    TagsController,
    RolesController,
    PostsController,
    PermissionsController,
    MessagesController,
    MediaFilesController,
    CommentController,
    BlogsController,
    FeedController,
  ],
  providers: [
    UsersService,
    TagsService,
    RolesService,
    PostsService,
    PermissionsService,
    MessagesService,
    MediaFilesService,
    CommentService,
    BlogsService,
    CurrentUserService,
    FeedService,
  ],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).forRoutes('/');
  }
}
