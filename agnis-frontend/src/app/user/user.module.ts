import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { userEffect } from './store/Effects/user.effect';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BackendErrorsMessagesModule } from '../shared/modules/backendErrorsMessages/backendErrorsMessages.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [{ path: 'users/:id', component: UserComponent }];

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('user', reducers),
    EffectsModule.forFeature([userEffect]),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    BackendErrorsMessagesModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class UserModule {}
