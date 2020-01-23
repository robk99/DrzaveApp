import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class GenericHttpService<T extends any> {

  private _baseUrl = environment.baseUrl;

  constructor(
    private _http: HttpClient,
    private _endpoint: string) { }

    post(item: T): Observable<T>{
      return this._http.post<T>(`${this._baseUrl}/${this._endpoint}`, item);
    }
  
    getAll(): Observable<T[]>{
      return this._http.get<T[]>(`${this._baseUrl}/${this._endpoint}`);
    }
  
    put(item: T): Observable<T>{
      return this._http.put<T>(`${this._baseUrl}/${this._endpoint}/${item.id}`, item);
    }
  
    delete(id: number){
      return this._http.delete(`${this._baseUrl}/${this._endpoint}/${id}`);
    }



}
