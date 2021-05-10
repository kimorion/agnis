import { Injectable } from '@nestjs/common';
import { EntityService } from '../../../Infrastructure/Utils/EntityService';
import { Permission } from '../../../Infrastructure/Entities/Permission';

@Injectable()
export class PermissionsService extends EntityService<Permission> {
}
