import { Component, Input } from '@angular/core';

import { LocalizationProvider } from '../../providers/localization/localization';

@Component({
  selector: 'pickup',
  templateUrl: 'pickup.html'
})

export class PickupComponent{

  @Input() isPinSet: boolean;
  @Input() map: any;

  constructor(public local: LocalizationProvider) { 
   }


}
