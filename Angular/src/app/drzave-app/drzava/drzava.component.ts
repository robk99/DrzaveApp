import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, FormControl } from '@angular/forms';
import { DrzavaService } from "../shared/services/http/drzava.service";
import { GradService } from "../shared/services/http/grad.service";
import { PopoverService } from '../shared/services/popover.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-drzava',
  templateUrl: './drzava.component.html',
  styles: []
})
export class DrzavaComponent implements OnInit {

  private _listaDrzava: FormArray = this._formBuilder.array([]);
  private _listaGradova: Grad[] = [];
  private _newDrzava: FormGroup;

  constructor(private _drzavaService: DrzavaService, private _gradService: GradService,
    private _formBuilder: FormBuilder, private _popover: PopoverService, private _router: Router, 
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.getDrzaveToList();
    this.getGradoviToList();
    this.setInputToDefaultValues();
  }

  getDrzaveToList() {
    this._drzavaService.getAll().subscribe(
      (res: Drzava[]) => {
        res.forEach((drz: Drzava) => {
          this._listaDrzava.push(this._formBuilder.group({
            id: [drz.id],
            ime: [drz.ime, Validators.required]
          }));
        })
      },
      err => {
        console.log("Dohvacanje liste drzava iz baze: ", err);
      });
  }

  getGradoviToList() {
    this._gradService.getAll().subscribe(
      (res: Grad[]) => {
        res.forEach((grad: Grad) => {
          this._listaGradova.push({
            id: grad.id,
            ime: grad.ime,
            populacija: grad.populacija,
            drzavaId: grad.drzavaId
          });
        })
      },
      err => {
        console.log("Dohvacanje liste gradova iz baze: ", err);
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
    this._listaDrzava.push(this._formBuilder.group({
      id: [form.value.id],
      ime: [form.value.ime]
    }));
  }

  insertDrzava(form: FormGroup) {
    this._drzavaService.post(form.value).subscribe(
      (res: Drzava) => {
        form.patchValue({ id: res.id });
        console.log("DRZAVA USPJESNO ZAPISANA!");
        this.pushFormGroupIntoArray(form);
        this.setInputToDefaultValues();
        this.toastr.success('Drzava uspjesno zapisana!');
      },
      err => {
        console.log("GRESKA u zapisivanju drzave!", err);
        console.log(form.value);
        this.toastr.error('GRESKA u zapisivanju drzave!');

      }
    );
  }

  onDelete(id: number, i: number) {
    this._drzavaService.delete(id).subscribe(
      (res: Drzava) => {
        this._listaDrzava.removeAt(i);
        console.log("DRZAVA IZBRISANA", id);
        this.toastr.success('Drzava uspjesno izbrisana!');
      },
      err => {
        console.log(`GRESKA u brisanju drzave( ID: ${id} )`, err);
        this.toastr.error('GRESKA u brisanju drzave!');
      }
    );
  }

  editButtonClick(id: number){
    this._router.navigateByUrl(`${environment.drzaveEditRoute}/${id}`);
  }
}
