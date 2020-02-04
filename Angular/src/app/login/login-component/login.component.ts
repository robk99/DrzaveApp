import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login-service/login.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  invalidLogin: boolean;

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
  }


  login(form: FormGroup) {
    let credentials = JSON.stringify(form.value);
    this.loginService.post(credentials,).subscribe(response => {
      let token = (<any>response).token;
      localStorage.setItem("jwt", token);
      this.invalidLogin = false;
      this.router.navigate(["/"]);
    }, err => {
      this.invalidLogin = true;
    });
  }

}
