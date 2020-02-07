import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/login/login-service/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class HttpErrorInterceptorService implements HttpInterceptor {


  constructor(private loginService: LoginService ){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe( 
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          
          if (error.status == 400) {
            return throwError(`Invalid username or password - ${error.message}`);
          }

          if (this.loginService.isTokenExpired()) {
            return throwError(`TOKEN EXPIRED - ${error.message}`);
          }

          if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
          }
          if (error.status == 0) {
            errorMessage = `Error in communication with server: ${error.error.message}`;
          } 
          else {
            errorMessage = `HTTP Error: ${error.status}\nMessage: ${error.message}`;
          }
          return throwError(errorMessage);
        })
      )
  }


  checkIsTokenExpired(){
    
  }

}
