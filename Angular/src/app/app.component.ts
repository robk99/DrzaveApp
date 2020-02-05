import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from './login/login-service/login.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular';

  private currentLogged: string;

  constructor(private loginService: LoginService, private router: Router){
  }


  ngOnInit(){
    this.currentLogged = this.loginService.getUser();
    this.loginService.watchStorage().subscribe((data:string)  => {
      this.currentLogged = data;
      })
  }

  logOut(){
    this.loginService.logOut();
    this.router.navigate([`/${environment.homeRoute}`]);
  }

}
