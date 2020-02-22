import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisableButtonService {

  private isButtonDisabled: boolean;

  constructor() { }

  setButtonDisabler(value: boolean){
    this.isButtonDisabled = value;
  }

  getButtonDisabler(): boolean{
    return this.isButtonDisabled;
  }
}
