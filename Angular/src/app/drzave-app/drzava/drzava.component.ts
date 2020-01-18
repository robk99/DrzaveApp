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
  listaDrzava: Drzava[];

  constructor(private _service: DrzavaService,
    private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this._service.getDrzave().subscribe(
      res => {
        if (res == [])
          this.addDrzavaInList();
        else {
          (res as []).forEach((drz: Drzava) => {
            this.drzaveListForms.push(this._formBuilder.group(drz))
          })
        }});
    this.resetForm();
  }

  addDrzavaInList() {
    this.drzaveListForms.push(this._formBuilder.group({
      ime: ['', Validators.required]
    }));
  }

  resetForm(form?: FormGroup) {
    if (form != null) {
      form.reset();
    }
    this._service.anullDrzava();
  }

  onSubmit(form: FormGroup) {
    if (this._service.savedFormData.id == 0) {
      this.insertDrzava(form);
    }
    else {
      this.updateDrzava(form);
    }
  }

  insertDrzava(form: FormGroup) {
    this._service.postDrzava().subscribe(res => {
      console.log("DRZAVA USPJESNO ZAPISANA");
      this.resetForm(form);
      this._service.getDrzave();
    },
      err => {
        console.log("GRESKA U ZAPISIVANJU DRZAVE");
        console.log(this._service.savedFormData);
      }
    );
  }

  updateDrzava(form: FormGroup) {
    this._service.putDrzava().subscribe(
      res => {
        this.resetForm(form);
        this._service.getDrzave();
      },
      err => {
        console.log(err);
      }
    )
  }

  populateForm(drzava: Drzava) {
    this._service.savedFormData = Object.assign({}, drzava);
    console.log("POPULATEEEEEE");
  }

  unpopulateForm() {
    this._service.savedFormData = Object.assign({});
    console.log("UNPOPULATExxxxxxx");
  }

}
