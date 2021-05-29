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
import { CreateBlogComponent } from './components/create-blog/create-blog.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogCardComponent } from './components/blog-card/blog-card.component';

const routes: Routes = [
  { path: 'create-blog', component: CreateBlogComponent },
  { path: 'blog-list', component: BlogListComponent }
];

@NgModule({
  declarations: [CreateBlogComponent, BlogListComponent, BlogCardComponent],
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
  ],
  exports: [CreateBlogComponent, BlogListComponent, BlogCardComponent],
})
export class BlogModule {}
