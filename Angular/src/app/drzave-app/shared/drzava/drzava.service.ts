import { Injectable } from '@angular/core';
import { Drzava } from "./drzava.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DrzavaService {
  formData: Drzava = { ime:'' };
  listaDrzava: Drzava[];
  readonly drzavaURL = "https://localhost:44326/api/drzave";

  constructor(private _http:HttpClient) { 
  }

  postDrzava(){
    return this._http.post(this.drzavaURL, this.formData);
  }

  getDrzave(){
    this._http.get(this.drzavaURL)
    .toPromise()
    .then(res => this.listaDrzava = res as Drzava[]);
  }

}
