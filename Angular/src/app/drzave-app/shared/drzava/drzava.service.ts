import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DrzavaService {

  baseUrl = environment.baseUrl;
  
  constructor(private _http:HttpClient) { 
  }

  postDrzava(form): Observable<any>{
    return this._http.post(this.baseUrl + "/drzave", form);
  }

  getDrzave(): Observable<Drzava[]>{
    return this._http.get<Drzava[]>(this.baseUrl + "/drzave");
  }

  putDrzava(form): Observable<any>{
    return this._http.put(this.baseUrl + "/drzave", form);
  }

  deleteDrzava(id: number): Observable<any>{
    return this._http.delete(this.baseUrl + '/drzave/' + id);
  }

}
