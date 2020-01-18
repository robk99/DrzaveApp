import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { DrzavaService } from "../shared/drzava/drzava.service";
import { Drzava } from "../shared/drzava/drzava.model";

@Component({
  selector: 'app-drzava',
  templateUrl: './drzava.component.html',
  styles: []
})
export class DrzavaComponent implements OnInit {

  drzaveListForms: FormArray = this._formBuilder.array([]);

  constructor(private _service: DrzavaService,
    private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this._service.getDrzave().subscribe(
      res => {
        if (res == []){
          this.addDrzavaInList();}
        else {
          (res as []).forEach((drz: any) => {
            this.drzaveListForms.push(this._formBuilder.group({
              id: [drz.id],
              ime: [drz.ime, Validators.required]
            }))
          })
        }});
  }

  addDrzavaInList() {
    console.log("NULA");
    this.drzaveListForms.push(this._formBuilder.group({
      id:[0],
      ime: ['', Validators.required]
    }));
  }

  onSubmit(form: FormGroup) {
    if (form.value.id == 0) {
      this.insertDrzava(form.value);
    }
    else {
      this.updateDrzava(form.value);
    }
  }

  insertDrzava(form: FormGroup) {
    this._service.postDrzava(form).subscribe(res => {
      console.log("DRZAVA USPJESNO ZAPISANA");
    },
      err => {
        console.log("GRESKA U ZAPISIVANJU DRZAVE");
        console.log(form.value);
      }
    );
  }

  updateDrzava(form: FormGroup) {
    this._service.putDrzava(form);
  }
}
