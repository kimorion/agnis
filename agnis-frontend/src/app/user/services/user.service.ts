import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDataInterface } from '../../shared/types/userData.interface';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(userId: string): Observable<UserDataInterface> {
    return this.http.get<UserDataInterface>(
      environment.URLS.apiHostUrl + environment.URLS.userPath + `/${userId}`,
    );
  }
}
