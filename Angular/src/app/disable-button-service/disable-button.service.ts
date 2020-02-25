import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DisableButtonService {

  private isButtonDisabled: boolean;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  setButtonDisabler(value: boolean) {
    this.setCursorToWait(value);
    this.isButtonDisabled = value;
  }

  getButtonDisabler(): boolean {
    return this.isButtonDisabled;
  }

  setCursorToWait(value: boolean){
    if (value) {
      this.document.body.classList.add('waiting');
    }
    else{
      this.document.body.classList.remove('waiting');
    }
  }
}
