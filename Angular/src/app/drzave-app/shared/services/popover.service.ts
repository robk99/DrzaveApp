import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopoverService {

  constructor() { }

  placements: String[] = ['top', 'bottom', 'left', 'right'];
  popoverTitle: String = 'Confirmation';
  popoverMessage: String[] = ['Are you completely sure you want to delete this country? <b>If country has cities they will be removed form database too!</b>', 'Are you completely sure you want to delete this city?' ];
  confirmText: String = 'Yes <i class="fas fa-check"></i>';
  cancelText: String = 'No <i class="fas fa-times"></i>';
  confirmClicked: Boolean = false;
  cancelClicked: Boolean = false;
}
