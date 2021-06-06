import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogDataListInterface } from '../../types/blogDataList.interface';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from '../../../shared/types/appState.interface';
import { PersistenceService } from '../../../shared/services/PersistenceService';
import { currentUserBlogsSelector } from '../../store/selectors';
import { UserDataInterface } from '../../../shared/types/userData.interface';
import { UserBlogsFetchStartAction } from '../../store/Actions/blog.action';
import { userUnauthorizedAction } from '../../../shared/store/Actions/userUnauthorized.action';

@Component({
  selector: 'app-user-blogs',
  templateUrl: './user-blogs.component.html',
  styleUrls: ['./user-blogs.component.scss'],
})
export class UserBlogsComponent implements OnInit {
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
      this.store.dispatch(UserBlogsFetchStartAction());
    } else {
      this.store.dispatch(userUnauthorizedAction());
    }
  }
}
