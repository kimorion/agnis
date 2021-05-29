import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { BaseService } from './services/base.service';
import { EffectsModule } from '@ngrx/effects';
import { BaseEffect } from './store/Effects/base.effect';
import { BackendErrorsMessagesModule } from '../backendErrorsMessages/backendErrorsMessages.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PersistenceService } from '../../services/PersistenceService';
import { CommonModule } from '@angular/common';

const routes: Routes = [];

@NgModule({
  declarations: [],
  providers: [BaseService, PersistenceService],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('base', reducers),
    EffectsModule.forFeature([BaseEffect]),
    BackendErrorsMessagesModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class BaseModule {}
