import { Injectable } from '@angular/core';
import { UserRequestInterface } from '../types/userRequest.interface';
import { Observable } from 'rxjs';
import { UserResponseInterface } from '../../shared/types/userResponseInterface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: UserRequestInterface): Observable<UserResponseInterface> {
    return this.http.post<UserResponseInterface>(
      environment.URLS.apiHostUrl + environment.URLS.userPath,
      data,
    );
  }
}
