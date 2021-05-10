import { Injectable } from '@nestjs/common';
import { EntityService } from '../../../Infrastructure/Utils/EntityService';
import { Post } from '../../../Infrastructure/Entities/Post';

@Injectable()
export class PostsService extends EntityService<Post> {}
