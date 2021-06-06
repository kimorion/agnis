import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isSubmittingSelector, registerValidationErrorsSelector } from '../../store/selectors';
import { AppStateInterface } from '../../../shared/types/appState.interface';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';
import { registerAction } from '../../store/Actions/auth.action';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  isSubmitting$: Observable<boolean>;
  validationErrors$: Observable<BackendErrorsInterface | null>;

  constructor(private store: Store<AppStateInterface>) {
    this.form = new FormGroup({
      login: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required]),
      bio: new FormControl('', []),
    });

    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.validationErrors$ = this.store.pipe(select(registerValidationErrorsSelector));
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.valid) this.store.dispatch(registerAction({ request: this.form.value }));
  }
}
