import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogDataListInterface } from '../../types/blogDataList.interface';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from '../../../shared/types/appState.interface';
import { PersistenceService } from '../../../shared/services/PersistenceService';
import { currentBlogsSelector, currentUserBlogsSelector } from '../../store/selectors';
import { UserDataInterface } from '../../../shared/types/userData.interface';
import { BlogsFetchStartAction, UserBlogsFetchStartAction } from '../../store/Actions/blog.action';
import { userUnauthorizedAction } from '../../../shared/store/Actions/userUnauthorized.action';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent implements OnInit {
  blogs$: Observable<BlogDataListInterface | null>;

  constructor(
    private store: Store<AppStateInterface>,
    private persistenceService: PersistenceService,
  ) {
    this.blogs$ = this.store.pipe(select(currentBlogsSelector));
  }

  ngOnInit(): void {
    let currentUser = this.persistenceService.tryGet<UserDataInterface>(
      PersistenceService.USER_ID_KEY,
    );
    if (currentUser) {
      this.store.dispatch(BlogsFetchStartAction());
    } else {
      this.store.dispatch(userUnauthorizedAction());
    }
  }
}
