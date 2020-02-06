import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RegisterService } from '../register-service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  private registerForm: FormGroup;

  constructor(private router: Router, private registerService: RegisterService, 
    private formBuilder: FormBuilder) { }

  ngOnInit() {
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

}
