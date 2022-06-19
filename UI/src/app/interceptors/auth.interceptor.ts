import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  refresh=false
  
  constructor(private http:HttpClient, private tokenService : TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const accessToken = this.tokenService.getAccessToken()
    
    if(accessToken){
      
      const req = request.clone({
        setHeaders:{
          authorization : `Bearer ${accessToken}`
        }
      })

      return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
        if (err.status === 403 && !this.refresh) {
          this.refresh = true;
          const refreshToken = this.tokenService.getRefreshToken()
          return this.http.post('http://localhost:8000/refresh', {token:refreshToken}).pipe(
            switchMap((res: any) => {
              const newAccessToken = res.accessToken
              this.tokenService.storeAccessToken(newAccessToken)
              return next.handle(request.clone({
                setHeaders: {
                  Authorization: `Bearer ${newAccessToken}`
                }
              }));
            })
          ) as Observable<HttpEvent<any>>;
        }
        this.refresh = false;
        return throwError(() => err);
      }));

    }

    return next.handle(request)

  }
}
