import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login-service/login.service';
import { environment } from "../../../environments/environment";


@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  invalidLogin: boolean;
  private loginForm: FormGroup;

  constructor(private router: Router, private loginService: LoginService, 
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.setInputToDefaultValues();
  }

  setInputToDefaultValues() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  login(form: FormGroup) {
    this.loginService.logIn(form.value).subscribe(response => {
      let token = (<any>response).token;
      localStorage.setItem('jwt', token);
      this.invalidLogin = false;
      this.router.navigate([`/${environment.countriesRoute}`]);
    }, err => {
      console.log("ERROR on login!", err);
      console.log(form.value);
      this.invalidLogin = true;
    });
  }

}
