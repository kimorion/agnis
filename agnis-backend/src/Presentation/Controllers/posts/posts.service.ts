import { Injectable } from '@nestjs/common';
import { EntityService } from '../../../Infrastructure/Utils/EntityService';
import { Post } from '../../../Infrastructure/Entities/Post';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService extends EntityService<Post> {
  constructor(@InjectRepository(Post) repository: Repository<Post>) {
    super(repository);
  }


}
