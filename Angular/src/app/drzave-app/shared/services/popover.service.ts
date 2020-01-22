import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopoverService {

  constructor() { }

  placements: String[] = ['top', 'bottom', 'left', 'right'];
  popoverTitle: String = 'Potvrda';
  popoverMessage: String = 'Jeste li stvarno <b>sigurni</b> da zelite izbrisati drzavu?';
  confirmText: String = 'Da <i class="fas fa-check"></i>';
  cancelText: String = 'Ne <i class="fas fa-times"></i>';
  confirmClicked: Boolean = false;
  cancelClicked: Boolean = false;
}
