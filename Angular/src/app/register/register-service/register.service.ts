import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient ) { }

  protected baseUrl = environment.baseUrl;
  private registrationSuccessfull: boolean = false;

  async post(newUser: User): Promise<boolean>{
    return await new Promise(resolve => {
      this.http.post(`${this.baseUrl}/${environment.registrationEndpoint}`, newUser).subscribe(
        res => {
          console.log("NEW USER SUCCESSFULLY REGISTERED");
          resolve(true);
        },
        err => {
          console.log("ERROR occured in user registration", err);
          resolve(false);
        }
      );
    })
    
  }
}
