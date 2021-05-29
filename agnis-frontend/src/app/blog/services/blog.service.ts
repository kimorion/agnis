import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BlogDataInterface } from '../types/blogData.interface';
import { environment } from '../../../environments/environment';
import { CreateBlogRequestInterface } from '../types/createBlogRequest.interface';
import { BlogDataListInterface } from '../types/blogDataList.interface';

@Injectable({
  providedIn: 'root',
})
export class blogService {
  constructor(private http: HttpClient) {
  }

  createBlog(data: CreateBlogRequestInterface): Observable<BlogDataInterface> {
    return this.http.post<BlogDataInterface>(
      environment.URLS.apiHostUrl + environment.URLS.blogPath,
      data,
    );
  }

  getUserBlogs(userId: string): Observable<BlogDataListInterface> {
    return this.http.get<BlogDataListInterface>(
      environment.URLS.apiHostUrl + `/${userId}` + environment.URLS.blogPath
    );
  }
}
