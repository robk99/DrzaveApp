import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class GenericHttpService<T extends any> {

  protected baseUrl = environment.baseUrl;

  constructor(
    protected http: HttpClient,
    protected endpoint: string) { }

    post(item: T): Observable<T>{
      return this.http.post<T>(`${this.baseUrl}/${this.endpoint}`, item);
    }
  
    getAll(): Observable<T[]>{
      return this.http.get<T[]>(`${this.baseUrl}/${this.endpoint}`);
    }

    getOne(id: number): Observable<T>{
      return this.http.get<T>(`${this.baseUrl}/${this.endpoint}/${id}`);
    }
  
    put(item: T): Observable<T>{
      return this.http.put<T>(`${this.baseUrl}/${this.endpoint}/${item.id}`, item);
    }
  
    delete(id: number){
      return this.http.delete(`${this.baseUrl}/${this.endpoint}/${id}`);
    }
}
