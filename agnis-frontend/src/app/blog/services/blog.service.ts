import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BlogDataInterface } from '../types/blogData.interface';
import { environment } from '../../../environments/environment';
import { CreateBlogRequestInterface } from '../types/createBlogRequest.interface';
import { BlogDataListInterface } from '../types/blogDataList.interface';
import { SubscriptionResponseInterface } from '../types/subscriptionResponse.interface';
import { ActivatedRoute, Router } from '@angular/router';
// @ts-ignore
import * as QueryString from 'querystring';
import { flatMap, map, mergeMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class blogService {
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {}

  createBlog(data: CreateBlogRequestInterface): Observable<BlogDataInterface> {
    return this.http.post<BlogDataInterface>(
      environment.URLS.apiHostUrl + environment.URLS.blogPath,
      data,
    );
  }

  getBlog(blogId: string): Observable<BlogDataInterface> {
    return this.http.get<BlogDataInterface>(
      environment.URLS.apiHostUrl + environment.URLS.blogPath + `/${blogId}`,
    );
  }

  getUserBlogs(): Observable<BlogDataListInterface> {
    return this.activatedRoute.queryParams.pipe(
      map((e) => {
        const params = new HttpParams().appendAll(e);

        return this.http.get<BlogDataListInterface>(
          environment.URLS.apiHostUrl +
            environment.URLS.currentUserPath +
            environment.URLS.blogPath,
          { params: params },
        );
      }),
      mergeMap((e) => e),
    );
  }

  getBlogs(): Observable<BlogDataListInterface> {
    return this.activatedRoute.queryParams.pipe(
      map((e) => {
        const params = new HttpParams().appendAll(e);

        return this.http.get<BlogDataListInterface>(
          environment.URLS.apiHostUrl + environment.URLS.blogPath,
          { params: params },
        );
      }),
      mergeMap((e) => e),
    );
  }

  subscribeToBlog(blogId: string): Observable<SubscriptionResponseInterface> {
    return this.http.post<SubscriptionResponseInterface>(
      environment.URLS.apiHostUrl + environment.URLS.feedPath,
      { blogId: blogId },
    );
  }

  unsubscribeToBlog(blogId: string): Observable<SubscriptionResponseInterface> {
    return this.http.delete<SubscriptionResponseInterface>(
      environment.URLS.apiHostUrl + environment.URLS.feedPath + `/${blogId}`,
    );
  }
}
