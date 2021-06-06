import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './components/feed/feed.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { MatInputModule } from '@angular/material/input';
import { BackendErrorsMessagesModule } from '../shared/modules/backendErrorsMessages/backendErrorsMessages.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { EffectsModule } from '@ngrx/effects';
import { postEffect } from './store/effects/post.effect';
import { PostService } from './services/post.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { PostComponent } from './components/post/post.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { feedEffect } from './store/effects/feed.effect';
import { MatPaginatorModule } from '@angular/material/paginator';

const routes: Routes = [
  { path: 'feed', component: FeedComponent },
  { path: 'posts/:id', component: PostComponent },
];

@NgModule({
  declarations: [
    PostCardComponent,
    PostCreateComponent,
    PostListComponent,
    FeedComponent,
    PostComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('post', reducers),
    EffectsModule.forFeature([postEffect, feedEffect]),
    MatInputModule,
    BackendErrorsMessagesModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatExpansionModule,
    MatPaginatorModule,
  ],
  providers: [PostService],
  exports: [PostCardComponent, PostCreateComponent, PostListComponent],
})
export class FeedModule {}
