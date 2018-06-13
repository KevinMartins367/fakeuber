import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class LoadProvider {

  constructor( public loadingCtrl: LoadingController) { }
 
  carregar(){
    const loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Localizando...',
    });
    return loading;
    // return loading.present();
  }
}
