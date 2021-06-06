import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from '../../../shared/types/appState.interface';
import { blogIsSubmittingSelector, blogValidationErrorsSelector } from '../../store/selectors';
import { BlogCreateStartAction } from '../../store/Actions/blog.action';

@Component({
  selector: 'app-create-blog',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.scss'],
})
export class BlogCreateComponent implements OnInit {
  form: FormGroup;
  validationErrors$: Observable<BackendErrorsInterface | null>;
  isSubmitting$: Observable<boolean>;

  constructor(private store: Store<AppStateInterface>) {
    this.form = new FormGroup({
      blogName: new FormControl('', [Validators.required]),
      blogDescription: new FormControl('', [Validators.maxLength(400)]),
    });

    this.validationErrors$ = this.store.pipe(select(blogValidationErrorsSelector));
    this.isSubmitting$ = this.store.pipe(select(blogIsSubmittingSelector));
  }

  ngOnInit(): void {
  }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      this.store.dispatch(
        BlogCreateStartAction({
          request: {
            ...this.form.value,
          },
        }),
      );
    }
  }
}
