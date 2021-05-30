import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersistenceService } from './PersistenceService';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private persistenceService: PersistenceService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const currentUserId = this.persistenceService.tryGet<string>(PersistenceService.USER_ID_KEY);

    req = req.clone({ setHeaders: { Authorization: currentUserId ?? '' } });

    return next.handle(req);
  }
}
