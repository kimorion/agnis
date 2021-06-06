import { Component, Input, OnInit } from '@angular/core';
import { BlogFetchStartAction } from '../../../blog/store/Actions/blog.action';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from '../../../shared/types/appState.interface';
import { Observable } from 'rxjs';
import { PostDataInterface } from '../../types/postData.interface';
import { activePostSelector } from '../../store/selectors';
import { PostFetchStartAction } from '../../store/actions/post.action';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  postId: string | null = null;
  postInfo: Observable<PostDataInterface | null>;

  constructor(private route: ActivatedRoute, private store: Store<AppStateInterface>) {
    this.postInfo = this.store.pipe(select(activePostSelector));
  }

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id');
    if (this.postId) {
      this.store.dispatch(PostFetchStartAction({ postId: this.postId }));
    }
  }
}
