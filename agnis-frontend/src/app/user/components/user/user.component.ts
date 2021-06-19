import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from '../../../shared/types/appState.interface';
import { UserDataInterface } from '../../../shared/types/userData.interface';
import { combineLatest, merge, Observable, Subscription } from 'rxjs';
import { selectedUserSelector, validationErrorsSelector } from '../../store/selectors';
import { UserFetchStartAction, UserUpdateStartAction } from '../../store/Actions/user.action';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, take } from 'rxjs/operators';
import { BackendErrorsInterface } from '../../../shared/types/backendErrors.interface';
import { currentUserSelector } from '../../../shared/store/selectors';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  userInfo: Observable<UserDataInterface | null>;
  currentUserInfo: Observable<UserDataInterface | null>;
  userId: string | null = null;
  form: FormGroup;
  isEditing: boolean = false;
  canEdit: boolean = false;
  validationErrors: Observable<BackendErrorsInterface | null>;
  routeParamSubscription: Subscription | null = null;

  constructor(private route: ActivatedRoute, private store: Store<AppStateInterface>) {
    this.userInfo = this.store.select(selectedUserSelector);
    this.currentUserInfo = this.store.select(currentUserSelector);
    combineLatest([this.currentUserInfo, this.userInfo]).subscribe(([current, selected]) => {
      this.canEdit =
        !!current &&
        !!selected &&
        (!!current.roleLinks?.some((e) => e.role.name === 'администратор') ||
          current.id === selected.id);
    });

    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required]),
      bio: new FormControl('', []),
    });

    this.validationErrors = this.store.select(validationErrorsSelector);
  }

  setFormValues(): void {
    this.userInfo
      .pipe(
        filter((e) => !!e),
        take(1),
      )
      .subscribe((e) => {
        this.form.controls.firstName.setValue(e?.firstName);
        this.form.controls.lastName.setValue(e?.lastName);
        this.form.controls.birthDate.setValue(e?.birthDate);
        this.form.controls.bio.setValue(e?.bio);
      });
  }

  ngOnInit(): void {
    this.routeParamSubscription = this.route.params.subscribe((e) => {
      this.userId = e['id'];
      if (this.userId) {
        this.store.dispatch(UserFetchStartAction({ userId: this.userId }));
      }
      this.setFormValues();
    });
  }

  ngOnDestroy(): void {
    if (this.routeParamSubscription) {
      this.routeParamSubscription.unsubscribe();
    }
  }

  onSubmit(): void {
    if (this.form.valid && this.userId)
      this.store.dispatch(
        UserUpdateStartAction({ userId: this.userId, userData: { ...this.form.value } }),
      );
    this.isEditing = false;
  }

  enterEdit(): void {
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.setFormValues();
  }
}
