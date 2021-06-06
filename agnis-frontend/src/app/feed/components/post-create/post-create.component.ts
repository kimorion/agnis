import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from '../../../shared/types/appState.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  activeBlogSelector,
  blogIsSubmittingSelector,
  blogValidationErrorsSelector,
} from '../../../blog/store/selectors';
import { Observable } from 'rxjs';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';
import { PostCreateStartAction } from '../../store/actions/post.action';
import { BlogDataInterface } from '../../../blog/types/blogData.interface';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit {
  form: FormGroup;
  validationErrors$: Observable<BackendErrorsInterface | null>;
  isSubmitting$: Observable<boolean>;
  activeBlog$: Observable<BlogDataInterface | null>;
  panelOpenState: boolean = false;

  constructor(private store: Store<AppStateInterface>) {
    this.form = new FormGroup({
      postName: new FormControl('', [Validators.required]),
      postContent: new FormControl('', [Validators.required, Validators.maxLength(10000)]),
    });

    this.validationErrors$ = this.store.pipe(select(blogValidationErrorsSelector));
    this.isSubmitting$ = this.store.pipe(select(blogIsSubmittingSelector));
    this.activeBlog$ = this.store.pipe(select(activeBlogSelector));
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.valid) {
      this.store
        .pipe(
          select(activeBlogSelector),
          take(1),
          filter((e) => !!e),
        )
        .subscribe((value) => {
          this.store.dispatch(
            PostCreateStartAction({
              request: {
                title: this.form.controls.postName.value,
                content: this.form.controls.postContent.value,
                blogId: value!.id,
                tags: [],
              },
            }),
          );
        });
    }
  }
}
