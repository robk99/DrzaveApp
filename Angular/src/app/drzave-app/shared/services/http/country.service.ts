import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { GenericHttpService } from './generic-http.service';


@Injectable({
  providedIn: 'root'
})
export class CountryService extends GenericHttpService<Country> {

  constructor(http:HttpClient) { 
    super(
      http,
      'countries'
    );
  }
}
