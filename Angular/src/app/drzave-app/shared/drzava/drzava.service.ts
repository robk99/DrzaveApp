import { Injectable } from '@angular/core';
import { Drzava } from "./drzava.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DrzavaService {
  formData: Drzava = { id: 0, ime:'' };
  listaDrzava: Drzava[];
  readonly drzavaURL = "https://localhost:44326/api/drzave";

  constructor(private _http:HttpClient) { 
  }

  anullDrzava(){
    this.formData = { id: 0, ime:'' };
  }

  postDrzava(){
    return this._http.post(this.drzavaURL, this.formData);
  }

  getDrzave(){
    this._http.get(this.drzavaURL)
    .toPromise()
    .then(res => this.listaDrzava = res as Drzava[]);
  }

  putDrzava(){
    return this._http.put(this.drzavaURL, this.formData);
  }

}
