import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogDataListInterface } from '../../types/blogDataList.interface';
import { AppStateInterface } from '../../../shared/types/appState.interface';
import { select, Store } from '@ngrx/store';
import { currentUserBlogsSelector } from '../../store/selectors';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent implements OnInit {
  userBlogs$: Observable<BlogDataListInterface | null>;

  constructor(private store: Store<AppStateInterface>) {
    this.userBlogs$ = this.store.pipe(select(currentUserBlogsSelector));
  }

  ngOnInit(): void {
  }
}
