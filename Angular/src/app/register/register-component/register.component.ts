import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RegisterService } from '../register-service/register.service';
import { LoginService } from 'src/app/login/login-service/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  private registerForm: FormGroup;

  constructor(private router: Router, private registerService: RegisterService, 
    private formBuilder: FormBuilder, private loginService: LoginService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.loginService.isUserLoggedIn();
    this.setInputToDefaultValues();
  }

  setInputToDefaultValues() {
    this.registerForm = this.formBuilder.group({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  goBack(){
    this.setInputToDefaultValues();
    this.router.navigateByUrl(`${environment.homeRoute}`);
  }

  async tryToRegisternewUser(regForm: FormGroup){
    let response: boolean = await this.registerService.post(regForm.value);
    if (response) {
      this.toastr.success('New user successfully registered!');
      this.goBack();
    }else{
      this.toastr.error('Error occured in user registration!');
    }
    
  }

}