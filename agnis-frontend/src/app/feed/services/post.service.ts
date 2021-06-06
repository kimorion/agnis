import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreatePostInterface } from '../types/createPost.interface';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { PostDataInterface } from '../types/postData.interface';
import { BlogDataInterface } from '../../blog/types/blogData.interface';

@Injectable()
export class PostService {
  constructor(private readonly http: HttpClient) {}

  createNewPost(request: CreatePostInterface): Observable<PostDataInterface> {
    return this.http.post<PostDataInterface>(
      environment.URLS.apiHostUrl + environment.URLS.postPath,
      request,
    );
  }

  getPost(postId: string): Observable<PostDataInterface> {
    return this.http.get<PostDataInterface>(
      environment.URLS.apiHostUrl +
      environment.URLS.postPath +
      `/${postId}`,
    );
  }
}
