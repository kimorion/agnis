import { Component, OnInit } from '@angular/core';
import { UserDataInterface } from '../../../types/userData.interface';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { currentUserSelector } from '../../../store/selectors';
import { AppStateInterface } from '../../../types/appState.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  currentUserInfo$: Observable<UserDataInterface | null>;

  constructor(
    private store: Store<AppStateInterface>,
  ) {
    this.currentUserInfo$ = this.store.pipe(select(currentUserSelector));
  }

  async ngOnInit(): Promise<void> {

  }
}
