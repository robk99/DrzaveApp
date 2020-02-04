import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  post(user: any) {
    return this.http.post(`${this.baseUrl}/${this.endpoint}`, user, this.header);
  }

}
