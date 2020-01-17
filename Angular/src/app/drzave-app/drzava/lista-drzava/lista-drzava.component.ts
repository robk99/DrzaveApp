import { Component, OnInit } from '@angular/core';
import { DrzavaService } from "../../shared/drzava/drzava.service";
import { Drzava } from "../../shared/drzava/drzava.model";
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-lista-drzava',
  templateUrl: './lista-drzava.component.html',
  styles: []
})
export class ListaDrzavaComponent implements OnInit {

  constructor(private _service:DrzavaService) { }

  ngOnInit() {
    this._service.getDrzave();
  }

  populateForm(drzava: Drzava){
    this._service.formData = Object.assign({}, drzava);
  }

}
