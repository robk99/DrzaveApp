import { Injectable } from '@angular/core';
import { Drzava } from "./drzava.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DrzavaService {
  savedFormData: Drzava = { id: 0, ime:'' };
  readonly drzavaURL = "https://localhost:44326/api/drzave";

  constructor(private _http:HttpClient) { 
  }

  anullDrzava(){
    this.savedFormData = { id: 0, ime:'' };
  }

  postDrzava(){
    return this._http.post(this.drzavaURL, this.savedFormData);
  }

  getDrzave(){
    return this._http.get(this.drzavaURL);
  }

  putDrzava(){
    return this._http.put(this.drzavaURL, this.savedFormData);
  }

}
