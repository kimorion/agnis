import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogDataListInterface } from '../../types/blogDataList.interface';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from '../../../shared/types/appState.interface';
import { PersistenceService } from '../../../shared/services/PersistenceService';
import { currentUserBlogsSelector } from '../../store/selectors';
import { UserDataInterface } from '../../../shared/types/userData.interface';
import {
  BlogsPageChangeAction,
  UserBlogsFetchStartAction,
  UserBlogsPageChangeAction,
} from '../../store/Actions/blog.action';
import { userUnauthorizedAction } from '../../../shared/store/Actions/userUnauthorized.action';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-blogs',
  templateUrl: './user-blogs.component.html',
  styleUrls: ['./user-blogs.component.scss'],
})
export class UserBlogsComponent implements OnInit {
  userBlogs$: Observable<BlogDataListInterface | null>;
  take: number = 5;
  skip: number = 0;
  pageIndex: number = 0;

  constructor(
    private store: Store<AppStateInterface>,
    private persistenceService: PersistenceService,
    private router: Router,
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

    this.router.navigate([], {
      queryParams: { skip: this.skip, take: this.take },
      queryParamsHandling: 'merge',
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.take = event.pageSize;
    this.skip = this.take * this.pageIndex;

    this.store.dispatch(UserBlogsPageChangeAction({ skip: this.skip, take: this.take }));
  }
}
