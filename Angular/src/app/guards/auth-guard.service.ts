import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "../../environments/environment";
import { LoginService } from '../login/login-service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  

  constructor(private router: Router, private loginService: LoginService) {
  }

  canActivate(){
    let token = localStorage.getItem('jwt');
    if (token && !this.loginService.isTokenExpired()) {
      return true;
    }
    this.router.navigate([`${environment.loginRoute}`]);
    console.log("You haven't logged in or your token expired");
    return false;
  }

}
