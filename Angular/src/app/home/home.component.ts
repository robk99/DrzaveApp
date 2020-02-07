import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { LoginService } from '../login/login-service/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private jwtHelper: JwtHelperService, private loginService: LoginService) {
  }

  ngOnInit(){
    this.loginService.isUserLoggedIn();
  }

}
