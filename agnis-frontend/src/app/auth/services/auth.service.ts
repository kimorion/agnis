import { Injectable } from '@angular/core';
import { UserRequestInterface } from '../types/userRequest.interface';
import { Observable } from 'rxjs';
import { UserDataInterface } from '../../shared/types/userDataInterface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoginRequestInterface } from '../types/loginRequest.interface';

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
}
