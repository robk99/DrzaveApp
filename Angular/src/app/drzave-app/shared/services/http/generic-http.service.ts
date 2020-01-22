import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class GenericHttpService {

  constructor(
    private _http: HttpClient,
    private url: string,
    private endpoint: string) { }
}
