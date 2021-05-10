import { Injectable } from '@nestjs/common';
import { EntityService } from '../../../Infrastructure/Utils/EntityService';
import { Tag } from '../../../Infrastructure/Entities/Tag';

@Injectable()
export class TagsService extends EntityService<Tag> {}
