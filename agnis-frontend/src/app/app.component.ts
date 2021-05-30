import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogDataInterface } from './blog/types/blogData.interface';
import { Store } from '@ngrx/store';
import { AppStateInterface } from './shared/types/appState.interface';
import { getCurrentUserAction } from './auth/store/Actions/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  blogInfoMock: BlogDataInterface = {
    name: 'Some Blog',
    id: 'some-uuid',
    description: 'Некоторое описание данного блога, данный блог посвящен собачкам!',
  };

  constructor(private router: Router, private store: Store<AppStateInterface>) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.store.dispatch(getCurrentUserAction());
  }
}
