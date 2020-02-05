import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject as Subject } from 'rxjs';
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
    return localStorage.getItem('loginUser');
  }

  setUser(key: string, data: string) {
    localStorage.setItem(key, data);
    this.storageSubject.next(data);
  }

  watchStorage(): Observable<any> {
    return this.storageSubject.asObservable();
  }

  logIn(loginUser: LoginUser) {
    this.setUser('loginUser', loginUser.username);
    return this.http.post(`${this.baseUrl}/${this.endpoint}`, loginUser, this.header);
  }

  logOut() {
    console.log("User logged off!");
    localStorage.removeItem('jwt');
    this.setUser('loginUser', '');
  }
  


}
