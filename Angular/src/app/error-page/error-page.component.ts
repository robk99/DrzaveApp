import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styles: []
})
export class ErrorPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goBack(){
    this.router.navigate([`/${environment.homeRoute}`]);
  }

}
