import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DrzavaService {
  readonly drzavaURL = "https://localhost:44326/api/drzave";
  constructor(private _http:HttpClient) { 
  }

  postDrzava(form){
    return this._http.post(this.drzavaURL, form);
  }

  getDrzave(){
    return this._http.get(this.drzavaURL);
  }

  putDrzava(form){
    return this._http.put(this.drzavaURL, form);
  }

  deleteDrzava(id: number){
    console.log("Really DELETED?", id);
    return this._http.delete(this.drzavaURL + '/' + id);
  }

}
