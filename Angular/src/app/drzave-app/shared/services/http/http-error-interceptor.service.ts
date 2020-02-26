import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/login/login-service/login.service';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'src/app/register/register-service/register.service';

@Injectable()
export class HttpErrorInterceptorService implements HttpInterceptor {


  constructor(private loginService: LoginService, private toastr: ToastrService, private registrerService: RegisterService ){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe( 
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          let token = localStorage.getItem("token");
          
          if (error.status == 0 || error.status == 500) {
            errorMessage = `Error in communication with server: ${error.message}`;
            this.toastr.error('Error in communication with server!');
            this.loginService.logOut();
          } 
          else if (error.status == 400) {
            errorMessage = `Invalid username or password - ${error.message}`;
          }
          else if (error.status == 409) {
            errorMessage = `Username already exists in database - ${error.message}`;
            this.registrerService.userIsFound(true);
          }
          else if (token && this.loginService.isTokenExpired()) {
            errorMessage = `TOKEN EXPIRED - ${error.message}`;
          }
          else if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
          }
          else {
            errorMessage = `Unknow error occured!;\nMessage: ${error.message}`;
          }
          return throwError(errorMessage);
        })
      )
  }
}
