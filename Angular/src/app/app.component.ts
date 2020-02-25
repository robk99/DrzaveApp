import { Component, OnInit } from '@angular/core';
import { LoginService } from './login/login-service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'Angular';

  private currentLogged: string;

  constructor(private loginService: LoginService, private router: Router) {
  }

  ngOnInit() {
    this.currentLogged = this.loginService.getUser();
    this.loginService.watchStorage().subscribe((data: string) => {
      this.currentLogged = data;
    });
  }

  logOut() {
    this.loginService.logOut();
  }

}
