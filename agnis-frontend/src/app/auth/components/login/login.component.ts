import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from '../../../shared/types/appState.interface';
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors';
import { registerAction } from '../../store/Actions/register.action';
import { loginAction } from '../../store/Actions/login.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isSubmitting$: Observable<boolean>;
  validationErrors$: Observable<BackendErrorsInterface | null>;

  constructor(private store: Store<AppStateInterface>) {
    this.form = new FormGroup({
      login: new FormControl('', [Validators.required]),
    });

    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.validationErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.valid)
      this.store.dispatch(loginAction({ request: this.form.value }));
  }
}
