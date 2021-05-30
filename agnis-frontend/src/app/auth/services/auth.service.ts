import { Injectable } from '@angular/core';
import { UserRequestInterface } from '../types/userRequest.interface';
import { Observable } from 'rxjs';
import { UserDataInterface } from '../../shared/types/userData.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoginRequestInterface } from '../types/loginRequest.interface';
import { select } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: UserRequestInterface): Observable<UserDataInterface> {
    return this.http.post<UserDataInterface>(
      environment.URLS.apiHostUrl + environment.URLS.userPath,
      data,
    );
  }

  login(request: LoginRequestInterface): Observable<UserDataInterface> {
    return this.http.post<UserDataInterface>(
      environment.URLS.apiHostUrl + environment.URLS.loginPath,
      request,
    );
  }

  getCurrentUser(): Observable<UserDataInterface> {
    return this.http
      .get<UserDataInterface>(environment.URLS.apiHostUrl + environment.URLS.currentUserPath)
      .pipe(select((e) => e));
  }
}
