import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


export class HttpErrorInterceptorService implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
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
}
