import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HeaderModel } from "../models/header-model";
import { Router } from '@angular/router';
import { flatMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  protected baseUrl = environment.baseUrl;
  protected endpoint = environment.loginRoute;
  protected header = new HeaderModel();
  private storageSubject = new Subject<String>();
  private loginSucceded: boolean;
  private wrongLogin: boolean;


  constructor(private http: HttpClient, private router: Router) { 
  }

  getUser(): string{
    return localStorage.getItem('loginUser');
  }

  setUser(key: string, data: string) {
    localStorage.setItem(key, data);
    this.storageSubject.next(data);
  }

  watchStorage(): Observable<any> {
    return this.storageSubject.asObservable();
  }

  logIn(loginUser: User): boolean {
    this.http.post(`${this.baseUrl}/${this.endpoint}`, loginUser, this.header)
    .subscribe(response => {
      let token = (<any>response).token;
      localStorage.setItem('jwt', token);
      this.loginSucceded = true;
      this.wrongLogin = false;
      this.router.navigate([`/${environment.countriesRoute}`])
      this.setUser('loginUser', loginUser.username);

    }, err => {
      console.log("ERROR on login!", err);
      this.loginSucceded = false;
      this.wrongLogin = true;
    });
    return this.loginSucceded;
  }

  isUserLogedIn(): boolean{
    return this.wrongLogin;
  }

  logOut() {
    console.log("User logged off!");
    localStorage.removeItem('jwt');
    this.setUser('loginUser', '');
    this.loginSucceded = false;
  }
  


}
