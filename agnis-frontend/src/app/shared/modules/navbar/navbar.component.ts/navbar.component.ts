import { Component, OnInit } from '@angular/core';
import { UserDataInterface } from '../../../types/userData.interface';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { currentUserSelector, isLoggedInSelector } from '../../../store/selectors';
import { AppStateInterface } from '../../../types/appState.interface';
import { logoutAction } from '../../../../auth/store/Actions/auth.action';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  currentUserInfo$: Observable<UserDataInterface | null>;
  isLoggedIn$: Observable<boolean | null>;

  constructor(
    private store: Store<AppStateInterface>,
  ) {
    this.currentUserInfo$ = this.store.pipe(select(currentUserSelector));
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
  }

  async ngOnInit(): Promise<void> {

  }

  logout() {
    this.store.dispatch(logoutAction())
  }
}
