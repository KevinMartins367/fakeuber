import { Component, Input, OnChanges } from '@angular/core';


@Component({
  selector: 'available-cars',
  templateUrl: 'available-cars.html'
})
export class AvailableCarsComponent {

  @Input() isPickupRequested: boolean;
  @Input() map: any;

  constructor() { }

}
