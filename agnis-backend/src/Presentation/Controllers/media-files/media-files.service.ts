import { Injectable } from '@nestjs/common';
import { EntityService } from '../../../Infrastructure/Utils/EntityService';
import { MediaFile } from '../../../Infrastructure/Entities/MediaFile';

@Injectable()
export class MediaFilesService extends EntityService<MediaFile> {
}
