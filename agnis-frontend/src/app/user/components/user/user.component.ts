import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '../../../shared/types/appState.interface';
import { UserDataInterface } from '../../../shared/types/userData.interface';
import { Observable } from 'rxjs';
import { selectedUserSelector } from '../../store/selectors';
import { BlogFetchStartAction } from '../../../blog/store/Actions/blog.action';
import { UserFetchStartAction } from '../../store/Actions/user.action';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  userInfo: Observable<UserDataInterface | null>;

  constructor(private route: ActivatedRoute, private store: Store<AppStateInterface>) {
    this.userInfo = this.store.select(selectedUserSelector);
  }

  ngOnInit(): void {
    let userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.store.dispatch(UserFetchStartAction({ userId: userId }));
    }
  }
}
