import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject as Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HeaderModel } from "../models/header-model";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  protected baseUrl = environment.baseUrl;
  protected endpoint = environment.loginRoute;
  protected header = new HeaderModel();


  constructor(private http: HttpClient) { 

  }

  loggUser(user: User) {
    return this.http.post(`${this.baseUrl}/${this.endpoint}`, user, this.header);
  }


  logOut() {
    console.log("User izlogiran!");
    localStorage.removeItem("jwt");
    sessionStorage.setItem('user', 'XX');
  }

  
  getUsername() : Observable<string> {
    return of(sessionStorage.getItem('user'));
  }

}
