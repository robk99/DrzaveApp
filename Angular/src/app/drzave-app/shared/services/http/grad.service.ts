import { Injectable } from '@angular/core';
import { GenericHttpService } from './generic-http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GradService extends GenericHttpService<Grad> {

  protected parentName: string;

  constructor(private _http: HttpClient) {
    super(
      _http,
      'gradovi'
    );
      this.parentName = 'drzave';
   }

   getGradovibyDrzava(drzava: any): Observable<any>{
    return this.http.get<any[]>(`${this.baseUrl}/${this.parentName}/${drzava.id}/${this.endpoint}`);
   }
}
