import { Injectable } from '@nestjs/common';
import { EntityService } from '../../../Infrastructure/Utils/EntityService';
import { Blog } from '../../../Infrastructure/Entities/Blog';

@Injectable()
export class BlogsService extends EntityService<Blog> {}
