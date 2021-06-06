import { Component, Input } from '@angular/core';
import { BlogDataListInterface } from '../../types/blogDataList.interface';
import { PersistenceService } from '../../../shared/services/PersistenceService';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent {
  @Input() blogProp: BlogDataListInterface | null = null;
  @Input() disableSubscribe: boolean = false;
  currentUserId: string | null;

  constructor(persistenceService: PersistenceService) {
    this.currentUserId = persistenceService.get(PersistenceService.USER_ID_KEY);
  }
}
