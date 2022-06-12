import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    if(localStorage.getItem('token'))
      return next.handle(request.clone({setHeaders:{authorization : `Bearer ${localStorage.getItem('token')}`}}));
    return next.handle(request.clone())
  }
}
