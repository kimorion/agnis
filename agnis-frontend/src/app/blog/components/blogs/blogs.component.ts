import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogDataListInterface } from '../../types/blogDataList.interface';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from '../../../shared/types/appState.interface';
import { PersistenceService } from '../../../shared/services/PersistenceService';
import { currentBlogsSelector } from '../../store/selectors';
import { UserDataInterface } from '../../../shared/types/userData.interface';
import { BlogsFetchStartAction, BlogsPageChangeAction } from '../../store/Actions/blog.action';
import { userUnauthorizedAction } from '../../../shared/store/Actions/userUnauthorized.action';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent implements OnInit {
  blogs$: Observable<BlogDataListInterface | null>;
  take: number = 5;
  skip: number = 0;
  pageIndex: number = 0;
  name: string = '';
  form: FormGroup;

  constructor(
    private store: Store<AppStateInterface>,
    private persistenceService: PersistenceService,
    private router: Router,
  ) {
    this.blogs$ = this.store.pipe(select(currentBlogsSelector));
    this.form = new FormGroup({
      blogName: new FormControl('', []),
    });
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

    this.router.navigate([], {
      queryParams: { skip: this.skip, take: this.take },
      queryParamsHandling: 'merge',
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.take = event.pageSize;
    this.skip = this.take * this.pageIndex;

    this.store.dispatch(BlogsPageChangeAction({ skip: this.skip, take: this.take }));
  }

  async onSubmit(): Promise<void> {
    this.router.navigate([], {
      queryParams: { name: this.form.controls.blogName.value },
      queryParamsHandling: 'merge',
    });
  }
}
