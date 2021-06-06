import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { blogEffect } from '../blog/store/Effects/blog.effect';
import { userEffect } from './store/Effects/user.effect';

const routes: Routes = [{ path: 'users/:id', component: UserComponent }];

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('user', reducers),
    EffectsModule.forFeature([userEffect]),
  ],
})
export class UserModule {}
