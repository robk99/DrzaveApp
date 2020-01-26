import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DrzavaService } from '../../shared/services/http/drzava.service';
import { GradService } from '../../shared/services/http/grad.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-grad-edit',
  templateUrl: './grad-edit.component.html',
  styles: []
})
export class GradEditComponent implements OnInit {
  private _id: number;
  private _gradZaEdit: FormGroup = this._formBuilder.group({
    id: new FormControl({value: 0, disabled: true}),
    ime: new FormControl('', Validators.required),
    populacija: new FormControl(),
    drzavaId: new FormControl()
  });
  private _gradIme: string;
  private _listaDrzava: Drzava[] = [];
  private _drzavaIme: string = '';


  constructor(private _route: ActivatedRoute, private _drzavaService: DrzavaService,
    private _gradService: GradService, private _formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit() {
    this.getGradIdFromRoute();
    this.getGradFromId();
    this.getDrzaveToList();
  }


  getGradIdFromRoute() {
    this._id = + this._route.snapshot.paramMap.get('id');
  }

  getGradFromId(){
    this._gradService.getOne(this._id)
    .subscribe((grad: Grad) => {
      this._gradZaEdit = this._formBuilder.group({
        id: [grad.id],
        ime: [grad.ime, Validators.required],
        populacija: [grad.populacija],
        drzavaId: [grad.drzavaId]
      }),
      this._gradIme = grad.ime;
    },
    err =>{
      console.log(`GRESKA u dohvacanju grada (Id: ${this._id})iz baze: `, err);
    });
  }

  updateGrad(form: FormGroup) {
    this._gradService.put(form.value).subscribe(
      res => {
        console.log("GRAD USPJESNO IZMIJENJEN");
        form.markAsPristine();
        this.toastr.success('Grad uspjesno izmijenjen!');

      },
      err => {
        console.log("GRESKA u izmjeni grada!", err);
        console.log(form.value);
        this.toastr.error('GRESKA u izmjeni grada!');
      }
    );
  }

  getDrzaveToList() {
    this._drzavaService.getAll().subscribe(
      (res: Drzava[]) => {
        res.forEach((drz: Drzava) => {
          this._listaDrzava.push({
            id: drz.id,
            ime: drz.ime
          });
        })
      },
      err => {
        console.log("GRESKA u dohvacanju liste drzava iz baze: ", err);
      });
  }

  anullGrad(){
    this._gradZaEdit = this._formBuilder.group({
      ime: new FormControl('', Validators.required),
      populacija: new FormControl(),
      drzavaId: new FormControl()
    });
  }
}
