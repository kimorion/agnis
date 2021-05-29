import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from '../../../shared/types/appState.interface';
import { blogIsSubmittingSelector, blogValidationErrorsSelector } from '../../store/selectors';
import { PersistenceService } from '../../../shared/services/PersistenceService';
import { UserDataInterface } from '../../../shared/types/userData.interface';
import { userUnauthorizedAction } from '../../../shared/store/Actions/userUnauthorized.action';
import { BlogCreateStartAction } from '../../store/Actions/blog.action';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss'],
})
export class CreateBlogComponent implements OnInit {
  form: FormGroup;
  validationErrors$: Observable<BackendErrorsInterface | null>;
  isSubmitting$: Observable<boolean>;

  constructor(
    private store: Store<AppStateInterface>,
    private persistenceService: PersistenceService,
  ) {
    this.form = new FormGroup({
      blogName: new FormControl('', [Validators.required]),
    });

    this.validationErrors$ = this.store.pipe(select(blogValidationErrorsSelector));
    this.isSubmitting$ = this.store.pipe(select(blogIsSubmittingSelector));
  }

  ngOnInit(): void {
  }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      let currentUser = this.persistenceService.tryGet<UserDataInterface>(
        PersistenceService.USER_INFO_KEY,
      );
      if (currentUser) {
        this.store.dispatch(
          BlogCreateStartAction({
            request: {
              blogName: this.form.controls.blogName.value,
              userId: currentUser.id,
            },
          }),
        );
      } else {
        this.store.dispatch(userUnauthorizedAction());
      }
    }
  }
}
