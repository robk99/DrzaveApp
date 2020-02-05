import { Injectable } from '@angular/core';
import { GenericHttpService } from './generic-http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from "../../models/city.model";


@Injectable({
  providedIn: 'root'
})
export class CityService extends GenericHttpService<City> {

  protected parentName: string;

  constructor(protected http: HttpClient) {
    super(
      http,
      'cities'
    );
      this.parentName = 'countries';
   }

   getCitiesByCountry(id: number): Observable<City[]>{
    return this.http.get<any[]>(`${this.baseUrl}/${this.parentName}/${id}/${this.endpoint}`);
   }
}
