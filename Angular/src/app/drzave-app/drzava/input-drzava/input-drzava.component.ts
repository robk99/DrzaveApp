import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DrzavaService } from "../../shared/drzava/drzava.service";


@Component({
  selector: 'app-input-drzava',
  templateUrl: './input-drzava.component.html',
  styles: []
})
export class InputDrzavaComponent implements OnInit {

  constructor(private _service:DrzavaService) { }

  ngOnInit() {
  }

  insertDrzava(form:NgForm){
    this._service.postDrzava().subscribe(res =>{
      console.log("USPJESNO ZAPISANA DRZAVA");
    },
    err =>{
      console.log("GRESKA U ZAPISIVANJU DRZAVE");
    }
    );
  }


}
