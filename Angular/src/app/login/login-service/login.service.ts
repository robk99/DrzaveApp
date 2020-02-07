import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HeaderModel } from "../models/header-model";
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  protected baseUrl = environment.baseUrl;
  protected endpoint = environment.loginRoute;
  protected header = new HeaderModel();
  private storageSubject = new Subject<String>();
  private loginSucceded: boolean = false;
  private loginErrorOccured: boolean;


  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) { 
  }

  getUser(): string{
    return localStorage.getItem('user');
  }

  setUser(key: string, data: string) {
    localStorage.setItem(key, data);
    this.storageSubject.next(data);
  }

  watchStorage(): Observable<any> {
    return this.storageSubject.asObservable();
  }

  logIn(user: User): boolean {
    this.http.post(`${this.baseUrl}/${this.endpoint}`, user, this.header)
    .subscribe(response => {
      let token = (<any>response).token;
      localStorage.setItem('jwt', token);
      this.loginSucceded = true;
      this.loginErrorOccured = false;
      this.router.navigate([`/${environment.countriesRoute}`])
      this.setUser('user', user.username);

    }, err => {
      console.log("ERROR on login!", err);
      this.loginSucceded = false;
      this.loginErrorOccured = true;
    });
    return this.loginSucceded;
  }

  isUserLoggedIn() {
    let token: string = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.router.navigate([`/${environment.countriesRoute}`]);
    }
  }

  userDontExist(): boolean{
    return this.loginErrorOccured;
  }

  loginErrorNotOccured(){
    this.loginErrorOccured = false;
  }

  logOut() {
    console.log("User logged off!");
    localStorage.removeItem('jwt');
    this.setUser('user', '');
    this.loginSucceded = false;
    this.router.navigate([`/${environment.homeRoute}`]);
  }
  
  isTokenExpired(): boolean{
    if (this.jwtHelper.isTokenExpired()) {
      this.logOut();
      return true;
    }
    return false;
  }


}
