import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap, CameraPosition,LatLng, GoogleMapsEvent, Marker, MarkerOptions, MarkerIcon } from '@ionic-native/google-maps';


import { CarProvider } from '../../providers/car/car';

@Injectable()
export class LocalizationProvider {

  map: GoogleMap;
  isMapIdle: boolean;
  public carMarkers: Array<Marker>;

  constructor(private geolocation: Geolocation, public carP: CarProvider) {  }

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
      // let latLng: LatLng = params[0].target;
      
      this.isMapIdle = false;
      this.removePickupMarker();
    });
    this.map.on(GoogleMapsEvent.CAMERA_MOVE_END).subscribe((params: any[]) => {
      console.log(params);
      
      // let latLng: LatLng = params[0].target;
      this.isMapIdle = true;
      this.showPickupMarker();
      this.fetchAndRefreshCars(); 
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
    if(this.isMapIdle == false){
      this.map.clear();
    }
  }

  addCarMarker(car){
    
    let icon: MarkerIcon = {
      url: 'assets/imgs/car-icon.png',
      size: {
        width: 50,
        height: 50
      }
    };
    
    let markerOptions: MarkerOptions ={
      id: car.id,
      icon: icon,
      position: new LatLng(car.coord.lat, car.coord.lng),
      map: this.map
    };

    return this.map.addMarker(markerOptions).then((marker: Marker) => {
      this.carMarkers.push(marker);
    });

  }
  
  fetchAndRefreshCars(){
    this.carP.getCars()
    .then((data: any) => {
      
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        this.addCarMarker(element);
        
      }
      
    })
    .catch((e) => console.error(e));
    
  }
  

}
