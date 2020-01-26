import { Component, OnInit, Output, PipeTransform, Pipe } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, FormControl } from '@angular/forms';
import { DrzavaService } from "../shared/services/http/drzava.service";
import { GradService } from "../shared/services/http/grad.service";
import { PopoverService } from '../shared/services/popover.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';



@Component({
  selector: 'app-grad',
  templateUrl: './grad.component.html',
  styles: []
})
export class GradComponent implements OnInit {

  private _listaGradova: FormArray = this._formBuilder.array([]);
  private _listaDrzava: Drzava[] = [];
  private _newGrad: FormGroup;
  private _drzavaIme: string;

  constructor(private _gradService: GradService, private _drzavaService: DrzavaService,
    private _formBuilder: FormBuilder, private _popover: PopoverService, private _router: Router) {
  }

  ngOnInit() {
    this.getDrzaveToList();
    this.getGradoviToList();
    this.setInputToDefaultValues();
  }

  getGradoviToList() {
    this._gradService.getAll().subscribe(
      res => {
        (res as Grad[]).forEach((grad: Grad) => {
          this._listaGradova.push(this._formBuilder.group({
            id: [grad.id],
            ime: [grad.ime, Validators.required],
            populacija: [grad.populacija],
            drzavaId: [grad.drzavaId],
            drzavaIme: [this.findDrzavaIme(grad.drzavaId)]
          }));
        })
      },
      err => {
        console.log("Dohvacanje liste gradova iz baze: ", err);
      });
  }

  findDrzavaIme(id: number): string {
    const FOUND = this._listaDrzava.find(element =>
      element.id == id)
    if (FOUND == null) {
      return '';
    }
    return FOUND.ime;
  }

  getDrzaveToList() {
    this._drzavaService.getAll().subscribe(
      res => {
        (res as Drzava[]).forEach((drz: Drzava) => {
          this._listaDrzava.push({
            id: drz.id,
            ime: drz.ime
          });
        })
      },
      err => {
        console.log("Dohvacanje liste drzava iz baze: ", err);
      });
  }


  pushFormGroupIntoArray(form: FormGroup) {
    console.log(form.value);
    this._listaGradova.push(this._formBuilder.group({
      id: [form.value.id],
      ime: [form.value.ime],
      populacija: [form.value.populacija],
      drzavaId: [form.value.drzavaId],
      drzavaIme: [this.findDrzavaIme(form.value.drzavaId)]
    }));
  }

  insertGrad(form: FormGroup) {
    this._gradService.post(form.value).subscribe(
      (res: any) => {
        form.patchValue({ id: res.id });
        console.log("GRAD USPJESNO ZAPISAN!");
        this.pushFormGroupIntoArray(form);
        this.setInputToDefaultValues();
      },
      err => {
        console.log("GRESKA u zapisivanju grada!", err);
        console.log(form.value);
      }
    );
  }

  onDelete(id: number, i: number) {
    this._gradService.delete(id).subscribe(
      res => {
        this._listaGradova.removeAt(i);
        console.log("GRAD IZBRISAN", id);
      },
      err => {
        console.log(`GRESKA u brisanju grada( ID: ${id} )`, err);
      }
    );
  }

  setInputToDefaultValues() {
    this._newGrad = this._formBuilder.group({
      id: new FormControl(0),
      ime: new FormControl(''),
      populacija: new FormControl(),
      drzavaId: new FormControl(),
      drzavaIme: new FormControl()
    });
  }

  editButtonClick(id: number) {
    this._router.navigateByUrl(`${environment.gradoviEditRoute}/${id}`);
  }

}
