import { Component, Input, OnInit } from '@angular/core';
import { PostDataInterface } from '../../types/postData.interface';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '../../../shared/types/appState.interface';
import { PostFetchStartAction, PostOpenAction } from '../../store/actions/post.action';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
  @Input() postDataProp: PostDataInterface | null = null;

  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {}

  onReadPost() {
    if (this.postDataProp?.id) {
      this.store.dispatch(PostOpenAction({ postId: this.postDataProp?.id }));
    }
  }
}
