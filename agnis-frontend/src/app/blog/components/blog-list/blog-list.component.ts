import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogDataListInterface } from '../../types/blogDataList.interface';
import { AppStateInterface } from '../../../shared/types/appState.interface';
import { select, Store } from '@ngrx/store';
import { currentUserBlogsSelector } from '../../store/selectors';
import { UserBlogsFetchStartAction } from '../../store/Actions/blog.action';
import { UserDataInterface } from '../../../shared/types/userData.interface';
import { PersistenceService } from '../../../shared/services/PersistenceService';
import { userUnauthorizedAction } from '../../../shared/store/Actions/userUnauthorized.action';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent implements OnInit {
  userBlogs$: Observable<BlogDataListInterface | null>;

  constructor(
    private store: Store<AppStateInterface>,
    private persistenceService: PersistenceService,
  ) {
    this.userBlogs$ = this.store.pipe(select(currentUserBlogsSelector));
  }

  ngOnInit(): void {
    let currentUser = this.persistenceService.tryGet<UserDataInterface>(
      PersistenceService.USER_ID_KEY,
    );
    if (currentUser) {
      this.store.dispatch(UserBlogsFetchStartAction({ userId: currentUser.id }));
    } else {
      this.store.dispatch(userUnauthorizedAction());
    }
  }
}
