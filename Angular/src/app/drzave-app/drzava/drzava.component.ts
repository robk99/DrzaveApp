import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, FormControl } from '@angular/forms';
import { DrzavaService } from "../shared/drzava/drzava.service";
import { PopoverService } from '../shared/popover.service';

@Component({
  selector: 'app-drzava',
  templateUrl: './drzava.component.html',
  styles: []
})
export class DrzavaComponent implements OnInit {

  drzaveListForms: FormArray = this._formBuilder.array([]);
  newDrzava: FormGroup;
  
  constructor(private _service: DrzavaService,
    private _formBuilder: FormBuilder, private _popover: PopoverService) {
  }

  ngOnInit() {
    this.getDrzaveToList();
    this.setInputToDefaultValues();
  }

  getDrzaveToList() {
    this._service.getDrzave().subscribe(
      res => {
        if (res == []) {
          /* Handle 404 Request if empty observable is returned */
        }
        else {
          (res as []).forEach((drz: any) => {
            this.drzaveListForms.push(this._formBuilder.group({
              id: [drz.id],
              ime: [drz.ime, Validators.required]
            }));
          })
        }
      });
  }

  setInputToDefaultValues() {
    this.newDrzava = this._formBuilder.group({
      id: new FormControl(0),
      ime: new FormControl('')
    });
  }

  pushFormGroupIntoArray(form: FormGroup) {
    console.log(form.value);
    this.drzaveListForms.push(this._formBuilder.group({
      id: [form.value.id],
      ime: [form.value.ime]
    }));
  }

  onSubmit(form: FormGroup) {
    if (form.value.id == 0) {
      this.insertDrzava(form);
    }
    else {
      this.updateDrzava(form);
    }
  }

  insertDrzava(form: FormGroup) {
    this._service.postDrzava(form.value).subscribe(
      (res: any) => {
        form.patchValue({ id: res.id });
        console.log("DRZAVA USPJESNO ZAPISANA!");
        this.pushFormGroupIntoArray(form);
        this.setInputToDefaultValues();
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
        form.markAsPristine();
      },
      err => {
        console.log("GRESKA u editiranju drzave!", err);
        console.log(form.value);
      }
    );
  }

  onDelete(id: number, i: number) {
    this._service.deleteDrzava(id).subscribe(
      res => {
        this.drzaveListForms.removeAt(i);
        console.log("DRZAVA OBRISANA", id);
      },
      err => {
        console.log("GRESKA U BRISANJU BRZANJE", id);
      }
    );
  }

  
}
