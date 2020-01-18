import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, NgForm } from '@angular/forms';
import { DrzavaService } from "../shared/drzava/drzava.service";

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
          /* Handle 404 Request if empty observable is returned */ }
        else {
          (res as []).forEach((drz: any) => {
            this.drzaveListForms.push(this._formBuilder.group({
              id: [drz.id],
              ime: [drz.ime, Validators.required]
            }))
          })
        }});
  }

  onSubmit(form: FormGroup) {
    if (form.value.id == null) {
      this.insertDrzava(form.value);
    }
    else {
      this.updateDrzava(form.value);
    }
  }

  insertDrzava(form: FormGroup) {
    this._service.postDrzava(form).subscribe(
      res => {
      console.log("DRZAVA USPJESNO ZAPISANA!");
    },
      err => {
        console.log("GRESKA u zapisivanju drzave!", err);
      }
    );
  }

  updateDrzava(form: FormGroup) {
    this._service.putDrzava(form).subscribe(
      res => {
        console.log("DRZAVA USPJESNO EDITIRANA");
      },
      err => {
        console.log("GRESKA u editiranju drzave!",err);
      }
    );
  }
}
