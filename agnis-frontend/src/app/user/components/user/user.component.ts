import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '../../../shared/types/appState.interface';
import { UserDataInterface } from '../../../shared/types/userData.interface';
import { Observable } from 'rxjs';
import { selectedUserSelector } from '../../store/selectors';
import { UserFetchStartAction } from '../../store/Actions/user.action';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  userInfo: Observable<UserDataInterface | null>;
  form: FormGroup;
  isEditing: boolean = false;

  constructor(private route: ActivatedRoute, private store: Store<AppStateInterface>) {
    this.userInfo = this.store.select(selectedUserSelector);

    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required]),
      bio: new FormControl('', []),
    });

    this.userInfo
      .pipe(
        filter((e) => !!e),
        take(1),
      )
      .subscribe((e) => {
        console.log('set', e);
        this.form.controls.firstName.setValue(e?.firstName);
        this.form.controls.lastName.setValue(e?.lastName);
        this.form.controls.birthDate.setValue(e?.birthDate);
        this.form.controls.bio.setValue(e?.bio);
      });
  }

  ngOnInit(): void {
    let userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.store.dispatch(UserFetchStartAction({ userId: userId }));
    }
  }

  onSubmit(): void {
    // if (this.form.valid) this.store.dispatch(registerAction({ request: this.form.value }));
  }
}
