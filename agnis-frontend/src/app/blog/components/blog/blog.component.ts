import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppStateInterface } from '../../../shared/types/appState.interface';
import { select, Store } from '@ngrx/store';
import { BlogFetchStartAction } from '../../store/Actions/blog.action';
import { BlogDataInterface } from '../../types/blogData.interface';
import { activeBlogSelector } from '../../store/selectors';
import { Observable } from 'rxjs';
import { UserDataInterface } from '../../../shared/types/userData.interface';
import { currentUserSelector } from '../../../shared/store/selectors';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  blogId: string | null = null;
  blogInfo: Observable<BlogDataInterface | null>;
  currentUser: Observable<UserDataInterface | null>;

  constructor(private route: ActivatedRoute, private store: Store<AppStateInterface>) {
    this.blogInfo = this.store.pipe(select(activeBlogSelector));
    this.currentUser = this.store.pipe(select(currentUserSelector));
  }

  ngOnInit(): void {
    this.blogId = this.route.snapshot.paramMap.get('id');
    if (this.blogId) {
      this.store.dispatch(BlogFetchStartAction({ blogId: this.blogId }));
    }
  }
}
