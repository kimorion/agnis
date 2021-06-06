import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeedDataInterface } from '../types/feedData.interface';
import { environment } from '../../../environments/environment';
// @ts-ignore
import * as QueryString from 'querystring';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  constructor(private readonly http: HttpClient) {}

  getUserFeed(skip: number, take: number): Observable<FeedDataInterface> {
    let params = new HttpParams().set('skip', skip.toString()).set('take', take.toString());

    return this.http.get<FeedDataInterface>(
      environment.URLS.apiHostUrl + environment.URLS.feedPath,
      {
        params: params
      },
    );
  }
}
