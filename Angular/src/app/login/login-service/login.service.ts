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
  private storageSubject = new Subject<String>();


  constructor(private http: HttpClient) { 
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

  logIn(user: User) {
    this.setUser('user', user.username);
    return this.http.post(`${this.baseUrl}/${this.endpoint}`, user, this.header);
  }

  logOut() {
    console.log("User izlogiran!");
    localStorage.removeItem('jwt');
    this.setUser('user', '');
  }
  


}
