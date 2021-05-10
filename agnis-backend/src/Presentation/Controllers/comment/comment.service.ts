import { Injectable } from '@nestjs/common';
import { EntityService } from '../../../Infrastructure/Utils/EntityService';
import { Comment } from '../../../Infrastructure/Entities/Comment';

@Injectable()
export class CommentService extends EntityService<Comment> {
}
