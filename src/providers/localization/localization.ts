import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap, CameraPosition,LatLng, GoogleMapsEvent, Marker, MarkerOptions, MarkerIcon } from '@ionic-native/google-maps';

@Injectable()
export class LocalizationProvider {

  map: GoogleMap;
  isMapIdle: boolean;

  constructor(private geolocation: Geolocation) {  }

  start(element){
    this.map = GoogleMaps.create(element);
    this.addMapEventListeners();
    this.getLocalization().subscribe(location => {
      this.centerLocation(location);
    });
  }

  getLocalization(){

    let locationObs = Observable.create(observable => {

      this.geolocation.getCurrentPosition()
      .then((position) => {

        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        let loc = new LatLng(lat, lng);

        observable.next(loc);

      }).catch(err =>{
        console.log(err);
      });

    });
    return locationObs;
  }

  centerLocation(location){
    if (location != null) {
      this.moveCamera(location);
    } else {
      this.getLocalization().subscribe(getlocalization => {
        this.moveCamera(getlocalization);
      });
    }
  }

  moveCamera(loc: LatLng){
    let local = loc;
    let options: CameraPosition<any> = {
      target: local,
      zoom: 15
    }
    this.map.moveCamera(options);
  }


  addMapEventListeners(){
    this.map.on(GoogleMapsEvent.CAMERA_MOVE).subscribe((params: any[]) => {
      let latLng: LatLng = params[0].target;
      console.log('teste');
      
      this.isMapIdle = false;
      this.removePickupMarker();
    });
    this.map.on(GoogleMapsEvent.CAMERA_MOVE_END).subscribe((params: any[]) => {
      let latLng: LatLng = params[0].target;
      console.log(latLng + " is clicked!");
      this.isMapIdle = true;
      this.showPickupMarker();
    });
  }
  
  showPickupMarker(){
    let icon: MarkerIcon = {
      url: 'assets/imgs/profile-icon.png',
      size: {
        width: 50,
        height: 50
      }
    };
    let latLng = this.map.getCameraTarget();
    let markerOptions: MarkerOptions ={
      title: 'Você esta aqui',
      position: latLng,
      icon: icon
    };
    
    return this.map.addMarker(markerOptions).then((marker: Marker) => {

      marker.showInfoWindow();
    
    });
    
  }

  removePickupMarker(){
    console.log('remove');
    
    this.map.clear();
    
  }

}
