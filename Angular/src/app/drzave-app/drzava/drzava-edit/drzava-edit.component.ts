import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DrzavaService } from '../../shared/services/http/drzava.service';
import { GradService } from '../../shared/services/http/grad.service';


@Component({
  selector: 'app-drzava-edit',
  templateUrl: './drzava-edit.component.html',
  styles: []
})
export class DrzavaEditComponent implements OnInit {
  private _id: number;
  private _drzavaZaEdit: FormGroup = this._formBuilder.group({
    id: new FormControl({value: 0, disabled: true}),
    ime: new FormControl('', Validators.required)
  });
  private _drzavaIme: string;
  private _listaGradova: Grad[] = [];

  constructor(private _route: ActivatedRoute, private _drzavaService: DrzavaService,
    private _gradService: GradService, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getDrzavaIdFromRoute();
    this.getDrzavaFromId();
    this.getGradoviByDrzava();
  }


  getDrzavaIdFromRoute() {
    this._id = + this._route.snapshot.paramMap.get('id');
  }

  getDrzavaFromId(){
    this._drzavaService.getOne(this._id)
    .subscribe((drz: Drzava) => {
      this._drzavaZaEdit = this._formBuilder.group({
        id: [drz.id],
        ime: [drz.ime, Validators.required]
      }),
      this._drzavaIme = drz.ime;
    },
    err =>{
      console.log(`Dohvacanje drzave (Id: ${this._id})iz baze: `, err);
    });
  }

  getGradoviByDrzava(){
    this._gradService.getGradovibyDrzava(this._id).subscribe(
      (res: Grad[]) => {
        res.forEach((grad: Grad) => {
          this._listaGradova.push({
            id: grad.id,
            ime: grad.ime,
            populacija: grad.populacija
          });
        })
      },
      err => {
        console.log(`Dohvacanje gradova po drzavi (id: ${this._id}) iz baze: `, err);
      });
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

}
