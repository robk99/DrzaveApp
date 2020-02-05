import { Component, OnInit, Output, PipeTransform, Pipe } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, FormControl } from '@angular/forms';
import { DrzavaService } from "../shared/services/http/drzava.service";
import { GradService } from "../shared/services/http/grad.service";
import { PopoverService } from '../shared/services/popover.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-grad',
  templateUrl: './grad.component.html',
  styles: []
})
export class GradComponent implements OnInit {

  private listaGradova: FormArray = this.formBuilder.array([]);
  private listaDrzava: Drzava[] = [];
  private newGrad: FormGroup;
  private drzavaIme: string;

  constructor(private gradService: GradService, private drzavaService: DrzavaService,
    private formBuilder: FormBuilder, private popover: PopoverService, private router: Router, 
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.getDrzaveToList();
    this.getGradoviToList();
    this.setInputToDefaultValues();
  }

  getGradoviToList(){
    this.gradService.getAll().subscribe(
      res => {
        (res as Grad[]).forEach((grad: Grad) => {
          this.listaGradova.push(this.formBuilder.group({
            id: [grad.id],
            ime: [grad.ime, Validators.required],
            populacija: [grad.populacija],
            drzavaId: [grad.drzavaId],
            drzavaIme: [this.findDrzavaIme(grad.drzavaId)]
          }));
        })
      },
      err => {
        console.log("GRESKA u dohvacanju liste gradova iz baze: ", err);
      });
  }

  findDrzavaIme(id: number): string {
    const FOUND = this.listaDrzava.find(res =>
      res.id == id)
    if (FOUND == null) {
      return '';
    }
    return FOUND.ime;
  }

  getDrzaveToList() {
    this.drzavaService.getAll().subscribe(
      (res: Drzava[]) => {
        res.forEach((drz: Drzava) => {
          this.listaDrzava.push({
            id: drz.id,
            ime: drz.ime
          });
        })
      },
      err => {
        console.log("GRESKA u dohvacanju liste drzava iz baze: ", err);
      });
  }


  pushFormGroupIntoArray(form: FormGroup) {
    console.log(form.value);
    this.listaGradova.push(this.formBuilder.group({
      id: [form.value.id],
      ime: [form.value.ime],
      populacija: [form.value.populacija],
      drzavaId: [form.value.drzavaId],
      drzavaIme: [this.findDrzavaIme(form.value.drzavaId)]
    }));
  }

  insertGrad(form: FormGroup) {
    this.gradService.post(form.value).subscribe(
      (res: Grad) => {
        form.patchValue({ id: res.id });
        console.log("GRAD USPJESNO ZAPISAN!");
        this.pushFormGroupIntoArray(form);
        this.setInputToDefaultValues();
        this.toastr.success('Grad uspjesno zapisan!');
      },
      err => {
        console.log("GRESKA u zapisivanju grada!", err);
        console.log(form.value);
        this.toastr.error('GRESKA u zapisivanju grada!');
      }
    );
  }

  onDelete(id: number, i: number) {
    this.gradService.delete(id).subscribe(
      (res: Grad) => {
        this.listaGradova.removeAt(i);
        console.log("GRAD IZBRISAN", id);
        this.toastr.success('Grad uspjesno izbrisan!');
      },
      err => {
        console.log(`GRESKA u brisanju grada( ID: ${id} )`, err);
        this.toastr.error('GRESKA u brisanju grada!');
      }
    );
  }

  setInputToDefaultValues() {
    this.newGrad = this.formBuilder.group({
      id: new FormControl(0),
      ime: new FormControl(''),
      populacija: new FormControl(),
      drzavaId: new FormControl(),
      drzavaIme: new FormControl()
    });
  }

  editButtonClick(id: number) {
    this.router.navigateByUrl(`${environment.gradoviEditRoute}/${id}`);
  }

}
