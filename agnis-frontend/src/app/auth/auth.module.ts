import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { AuthService } from './services/auth.service';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffect } from './store/Effects/auth.effect';
import { BackendErrorsMessagesModule } from '../shared/modules/backendErrorsMessages/backendErrorsMessages.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PersistenceService } from '../shared/services/PersistenceService';
import { LoginComponent } from './components/login/login.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  providers: [AuthService, PersistenceService],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffect]),
    BackendErrorsMessagesModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [LoginComponent, RegisterComponent],
})
export class AuthModule {}
