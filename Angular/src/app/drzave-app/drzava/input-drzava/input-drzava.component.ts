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

  resetForm(form?: NgForm){
    if(form!=null){
      form.resetForm();
    }
    this._service.formData = { ime:'' };
  }

  onSubmit(form:NgForm){
    if(this._service.formData.id == null){
      this.insertDrzava(form);
    }
    else{
      this.updateDrzava(form);
    }
  }

  insertDrzava(form:NgForm){
    this._service.postDrzava().subscribe(res =>{
      console.log("DRZAVA USPJESNO ZAPISANA");
      this.resetForm(form);
      this._service.getDrzave();
    },
    err =>{
      console.log("GRESKA U ZAPISIVANJU DRZAVE");
      console.log(this._service.formData);
    }
    );
  }

  updateDrzava(form:NgForm){
    this._service.putDrzava().subscribe(
      res => {
        this.resetForm(form);
        this._service.getDrzave();
      },
      err =>{
        console.log(err);
      }
    )
  }


}
