import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BlogDataInterface } from '../types/blogData.interface';
import { environment } from '../../../environments/environment';
import { CreateBlogRequestInterface } from '../types/createBlogRequest.interface';
import { BlogDataListInterface } from '../types/blogDataList.interface';
import { SubscriptionResponseInterface } from '../types/subscriptionResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class blogService {
  constructor(private http: HttpClient) {}

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
    return this.http.get<BlogDataListInterface>(
      environment.URLS.apiHostUrl + environment.URLS.currentUserPath + environment.URLS.blogPath,
    );
  }

  getBlogs(): Observable<BlogDataListInterface> {
    return this.http.get<BlogDataListInterface>(
      environment.URLS.apiHostUrl + environment.URLS.blogPath,
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
