import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap, CameraPosition,LatLng, GoogleMapsEvent, Marker, MarkerOptions } from '@ionic-native/google-maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: GoogleMap;
  markers = [];

  constructor(public navCtrl: NavController, private geolocation: Geolocation) {  
    // this.start();
   }

  // ngAfterViewInit(){
  //   this.initMap();
  // }

  ionViewDidLoad(){
    let element = this.mapElement.nativeElement;
    this.map = GoogleMaps.create(element);
    this.start();
  }

  start(){
    let loc: LatLng;
    this.map.on(GoogleMapsEvent.MAP_READY)
    .subscribe(() => {

      this.geolocation.getCurrentPosition()
      .then((position) => {

        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        
        loc = new LatLng(lat, lng);
        this.moveCamera(loc);

        this.createMarker(loc, "Você")
        .then((marker: Marker) =>{
          marker.showInfoWindow();
        }).catch(err =>{
          console.log(err);
        });

      }).catch(err =>{
        console.log(err);
      });
    });
  }

  moveCamera(loc: LatLng){
    let local = loc;
    let options: CameraPosition<any> = {
      target: local,
      zoom: 18,
      tilt: 30
    }
    this.map.moveCamera(options);
  }

  createMarker(loc: LatLng, title: string){
    let markerOptions: MarkerOptions ={
      position: loc,
      title: title
    };

    return this.map.addMarker(markerOptions);
  }

}
