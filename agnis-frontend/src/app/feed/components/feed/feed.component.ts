import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from '../../../shared/types/appState.interface';
import { FeedFetchStartAction } from '../../store/actions/feed.action';
import { PersistenceService } from '../../../shared/services/PersistenceService';
import { currentUserSelector } from '../../../shared/store/selectors';
import { filter, first, take } from 'rxjs/operators';
import { PostDataInterface } from '../../types/postData.interface';
import { Observable } from 'rxjs';
import { feedPostsSelector } from '../../store/selectors';
import { FeedDataInterface } from '../../types/feedData.interface';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  feedPosts: Observable<FeedDataInterface | null>;
  take: number = 5;
  skip: number = 0;
  pageIndex: number = 0;

  constructor(private route: ActivatedRoute, private store: Store<AppStateInterface>) {
    this.feedPosts = store.pipe(select(feedPostsSelector));
  }

  ngOnInit(): void {
    this.store
      .select(currentUserSelector)
      .pipe(
        filter((v) => !!v?.id),
        select((u) => u!.id!),
        take(1),
      )
      .subscribe((id) => {
        this.store.dispatch(FeedFetchStartAction({ take: this.take, skip: this.skip }));
      });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.take = event.pageSize;
    this.skip = this.take * this.pageIndex;
    this.store.dispatch(FeedFetchStartAction({ take: this.take, skip: this.skip }));
  }
}
