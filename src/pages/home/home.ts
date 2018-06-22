import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LocalizationProvider } from '../../providers/localization/localization';
import { LoadProvider } from '../../providers/load/load';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  
  isPickupRequested: boolean;
  isMapIdle: boolean;
  loading: any;

  constructor(public navCtrl: NavController, public local: LocalizationProvider, public load: LoadProvider) { 
    this.isPickupRequested = false;
    this.loading = this.load.carregar();
   }

  ionViewDidLoad(){
    let element = this.mapElement.nativeElement;
    this.local.start(element); 
    this.isMapIdle =  this.local.isMapIdle;
   
  }

  confirmPickup(){
    
    this.loading.present();
    this.isPickupRequested = true;
    this.loading.dismiss();

  }

  cancelPickup(){
    
    this.loading.present();
      
    this.isPickupRequested = false;
    this.loading.dismiss();
  }

  centerLocation(){
    this.local.centerLocation(null);
  }
  
}
