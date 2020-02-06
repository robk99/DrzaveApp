import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  protected baseUrl = environment.baseUrl;

  post(newUser: User){
    this.http.post(`${this.baseUrl}/${environment.registrationEndpoint}`, newUser).subscribe(
      res => {
        this.toastr.success('New user successfully registered!');
        console.log("NEW USER SUCCESSFULLY REGISTERED");
      },
      err => {
        this.toastr.error('Error occured in user registration!');
        console.log("ERROR occured in user registration", err);
      }
    );
  }
}
