import { NgModule } from '@angular/core';
import { PickupComponent } from './pickup/pickup';
import { AvailableCarsComponent } from './available-cars/available-cars';
@NgModule({
	declarations: [PickupComponent,
    AvailableCarsComponent],
	imports: [],
	exports: [PickupComponent,
    AvailableCarsComponent]
})
export class ComponentsModule {}
