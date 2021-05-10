import { Injectable } from '@nestjs/common';
import { EntityService } from '../../../Infrastructure/Utils/EntityService';
import { Role } from '../../../Infrastructure/Entities/Role';

@Injectable()
export class RolesService extends EntityService<Role> {
}
