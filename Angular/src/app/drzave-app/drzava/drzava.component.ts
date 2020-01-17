import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DrzavaService } from "../shared/drzava/drzava.service";
import { Drzava } from "../shared/drzava/drzava.model";

@Component({
  selector: 'app-drzava',
  templateUrl: './drzava.component.html',
  styles: []
})
export class DrzavaComponent implements OnInit {

  constructor(private _service:DrzavaService) { }

  ngOnInit() {
    this._service.getDrzave();
    this.resetForm();
  }

  resetForm(form?: NgForm){
    if(form!=null){
      form.resetForm();
    }
    this._service.anullDrzava();
  }

  onSubmit(form:NgForm){
    if(this._service.formData.id == 0){
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

  populateForm(drzava: Drzava){
    this._service.formData = Object.assign({}, drzava);
    console.log("POPULATEEEEEE");
  }

  unpopulateForm(){
    this._service.formData = Object.assign({});
    console.log("UNPOPULATExxxxxxx");
  }

}
