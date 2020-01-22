import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { GenericHttpService } from './generic-http.service';


@Injectable({
  providedIn: 'root'
})
export class DrzavaService extends GenericHttpService<Drzava> {

  constructor(_http:HttpClient) { 
    super(
      _http,
      'drzave'
    );
  }
}
