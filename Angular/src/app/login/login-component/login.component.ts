import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login-service/login.service';
import { environment } from "../../../environments/environment";
import { DisableButtonService } from 'src/app/disable-button-service/disable-button.service';


@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  private loginForm: FormGroup;
  private isLoginButtonPressed: boolean;

  constructor(private router: Router, private loginService: LoginService,
    private formBuilder: FormBuilder, private btnService: DisableButtonService) { }

  ngOnInit() {
    this.loginService.isUserLoggedIn();
    this.loginService.loginErrorNotOccured();
    this.isLoginButtonPressed = false;
    this.setInputToDefaultValues();
    this.btnService.setButtonDisabler(false);
  }

  setInputToDefaultValues() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  goBack() {
    this.setInputToDefaultValues();
    this.router.navigateByUrl(`${environment.homeRoute}`);
  }

  logIn() {
    this.btnService.setButtonDisabler(true);
    this.loginService.logIn(this.loginForm.value);
  }

  userDontExist(): boolean {
    if (this.loginService.userDontExist()) {
      this.btnService.setButtonDisabler(false);
      return true;
    }
    else{
      return false;
    }
  }
}
