import { Injectable } from '@nestjs/common';
import { EntityService } from '../../../Infrastructure/Utils/EntityService';
import { Message } from '../../../Infrastructure/Entities/Message';

@Injectable()
export class MessagesService extends EntityService<Message> {}
