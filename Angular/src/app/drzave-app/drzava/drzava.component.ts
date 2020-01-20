import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, NgForm, FormControlName, FormControl } from '@angular/forms';
import { DrzavaService } from "../shared/drzava/drzava.service";

@Component({
  selector: 'app-drzava',
  templateUrl: './drzava.component.html',
  styles: []
})
export class DrzavaComponent implements OnInit {

  drzaveListForms: FormArray = this._formBuilder.array([]);
  newDrzava: FormGroup;

  constructor(private _service: DrzavaService,
    private _formBuilder: FormBuilder) { 
      this.newDrzava = this._formBuilder.group({
        id: new FormControl(0),
        ime: new FormControl('')
      });
    }

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
            }));
          })
        }});
  }

  onSubmit(form: FormGroup) {
    if (form.value.id == 0) {
      this.insertDrzava(form);
    }
    else {
      this.updateDrzava(form);
    }
  }

  resetInputForm(form: FormGroup){
    form.reset();
  }

  insertDrzava(form: FormGroup) {
    this._service.postDrzava(form.value).subscribe(
      res => {
      console.log("DRZAVA USPJESNO ZAPISANA!");
      this.resetInputForm(form);
    },
      err => {
        console.log("GRESKA u zapisivanju drzave!", err);
        console.log(form.value);
      }
    );
  }

  updateDrzava(form: FormGroup) {
    this._service.putDrzava(form.value).subscribe(
      res => {
        console.log("DRZAVA USPJESNO EDITIRANA");
      },
      err => {
        console.log("GRESKA u editiranju drzave!",err);
        console.log(form.value);

      }
    );
  }
}
