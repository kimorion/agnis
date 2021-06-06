import { Component, Input, OnInit } from '@angular/core';
import { BlogDataInterface } from '../../types/blogData.interface';
import { AppStateInterface } from '../../../shared/types/appState.interface';
import { Store } from '@ngrx/store';
import { OpenBlogAction, SubscribeBlogStartAction, UnsubscribeBlogStartAction } from '../../store/Actions/blog.action';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss'],
})
export class BlogCardComponent implements OnInit {
  @Input() blogInfoProp: BlogDataInterface | null = null;
  @Input() disableSubscribe: boolean = false;

  blogInfo: BlogDataInterface | null = null;

  constructor(private readonly store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    this.blogInfo = this.blogInfoProp;
  }

  onReadBlog() {
    if (this.blogInfo) {
      this.store.dispatch(OpenBlogAction({ blogId: this.blogInfo.id }));
    }
  }

  onSubscribeBlog() {
    if (this.blogInfo) {
      this.store.dispatch(SubscribeBlogStartAction({ blogId: this.blogInfo.id }));
    }
  }

  onUnsubscribeBlog() {
    if (this.blogInfo) {
      this.store.dispatch(UnsubscribeBlogStartAction({ blogId: this.blogInfo.id }));
    }
  }
}
