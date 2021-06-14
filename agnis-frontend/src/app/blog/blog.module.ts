import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { blogService } from './services/blog.service';
import { EffectsModule } from '@ngrx/effects';
import { blogEffect } from './store/Effects/blog.effect';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { PersistenceService } from '../shared/services/PersistenceService';
import { BackendErrorsMessagesModule } from '../shared/modules/backendErrorsMessages/backendErrorsMessages.module';
import { BlogCreateComponent } from './components/blog-create/blog-create.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import { BlogComponent } from './components/blog/blog.component';
import { FeedModule } from '../feed/feed.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { UserBlogsComponent } from './components/user-blogs/user-blogs.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { MatPaginatorModule } from '@angular/material/paginator';

const routes: Routes = [
  { path: 'blog-create', component: BlogCreateComponent },
  { path: 'user-blogs', component: UserBlogsComponent },
  { path: 'blogs', component: BlogsComponent },
  { path: 'blogs/:id', component: BlogComponent },
];

@NgModule({
  declarations: [
    BlogCreateComponent,
    BlogListComponent,
    BlogCardComponent,
    BlogComponent,
    UserBlogsComponent,
    BlogsComponent,
  ],
  providers: [blogService, PersistenceService],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('blog', reducers),
    EffectsModule.forFeature([blogEffect]),
    BackendErrorsMessagesModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FeedModule,
    MatExpansionModule,
    MatPaginatorModule,
  ],
  exports: [BlogCreateComponent, BlogListComponent, BlogCardComponent],
})
export class BlogModule {}
