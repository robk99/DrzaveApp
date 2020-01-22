import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class GenericHttpService {

  private _baseUrl = environment.baseUrl;

  constructor(
    private _http: HttpClient,
    private _endpoint: string) { }

    post(item: any): Observable<any>{
      return this._http.post(`${this._baseUrl}/${this._endpoint}`, item);
    }
  
    getAll(): Observable<any[]>{
      return this._http.get<any[]>(`${this._baseUrl}/${this._endpoint}`);
    }
  
    put(item: any): Observable<any>{
      return this._http.put(`${this._baseUrl}/${this._endpoint}`, item);
    }
  
    delete(id: number): Observable<any>{
      return this._http.delete(`${this._baseUrl}/${this._endpoint}/${id}`);
    }



}
