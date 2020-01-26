import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopoverService {

  constructor() { }

  placements: String[] = ['top', 'bottom', 'left', 'right'];
  popoverTitle: String = 'Potvrda';
  popoverMessage: String[] = ['Jeste li stvarno sigurni da zelite obrisati ovu drzavu? <b>Ukoliko drzava posjeduje gradove i oni ce biti uklonjeni iz baze!</b>', 'Jeste li stvarno sigurni da zelite obrisati ovaj grad?' ];
  confirmText: String = 'Da <i class="fas fa-check"></i>';
  cancelText: String = 'Ne <i class="fas fa-times"></i>';
  confirmClicked: Boolean = false;
  cancelClicked: Boolean = false;
}
