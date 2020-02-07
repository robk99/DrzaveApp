import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styles: []
})
export class ErrorPageComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  goBack(){
    this.location.back();
    this.location.back();
  }

}
