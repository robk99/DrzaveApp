import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, FormControl } from '@angular/forms';
import { DrzavaService } from "../shared/services/http/drzava.service";
import { GradService } from "../shared/services/http/grad.service";
import { PopoverService } from '../shared/services/popover.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';



@Component({
  selector: 'app-drzava',
  templateUrl: './drzava.component.html',
  styles: []
})
export class DrzavaComponent implements OnInit {

  private _drzaveListForms: FormArray = this._formBuilder.array([]);
  private _newDrzava: FormGroup;
  private popoverMessage: string = 'Jeste li stvarno sigurni da zelite obrisati ovu drzavu? <b>Ukoliko drzava posjeduje gradove i oni ce biti uklonjeni iz baze!</b>';

  constructor(private _drzavaService: DrzavaService, private _gradService: GradService,
    private _formBuilder: FormBuilder, private _popover: PopoverService, private _router: Router) {
  }

  ngOnInit() {
    this.getDrzaveToList();
    this.setInputToDefaultValues();
  }

  getDrzaveToList() {
    this._drzavaService.getAll().subscribe(
      res => {
        (res as []).forEach((drz: any) => {
          this._drzaveListForms.push(this._formBuilder.group({
            id: [drz.id],
            ime: [drz.ime, Validators.required]
          }));
        })
      },
      err => {
        console.log("Dohvacanje liste drzava iz baze: ", err);
      });
  }

  setInputToDefaultValues() {
    this._newDrzava = this._formBuilder.group({
      id: new FormControl(0),
      ime: new FormControl('')
    });
  }

  pushFormGroupIntoArray(form: FormGroup) {
    console.log(form.value);
    this._drzaveListForms.push(this._formBuilder.group({
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
    this._drzavaService.post(form.value).subscribe(
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
    this._drzavaService.put(form.value).subscribe(
      res => {
        console.log("DRZAVA USPJESNO IZMIJENJENA");
        form.markAsPristine();
      },
      err => {
        console.log("GRESKA u izmjeni drzave!", err);
        console.log(form.value);
      }
    );
  }

  onDelete(id: number, i: number) {
    this._drzavaService.delete(id).subscribe(
      res => {
        this._drzaveListForms.removeAt(i);
        console.log("DRZAVA IZBRISANA", id);
      },
      err => {
        console.log(`GRESKA u brisanju drzave( ID: ${id} )`, err);
      }
    );
  }

  editButtonClick(id: number){
    this._router.navigateByUrl(`${environment.drzaveEditRoute}/${id}`);
  }
}
