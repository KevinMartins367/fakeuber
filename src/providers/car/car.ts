import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class CarProvider {

  private API_URL = 'link_api';

  constructor( public http: HttpClient) {  }

  getCars(){
    return new Promise((resolve, reject) => {
      this.http.get(this.API_URL)
      .subscribe((result: any) => {        
        resolve(result);
      },
      (error) => {
        reject(this.cars);
      });
    });
  }

  private cars = [{
    "id": 1,
    "coord": {
      "lat": -29.74551,
      "lng": -50.00939
    }
  },
  {
    "id": 2,
    "coord": {
      "lat": -29.74831,
      "lng": -50.00951
    }
  },
  {
    "id": 3,
    "coord": {
      "lat": -29.74823,
      "lng": -50.00531
    }
  },
  {
    "id": 4,
    "coord": {
      "lat": -29.74403,
      "lng": -50.00728
    }
  },
  {
    "id": 5,
    "coord": {
      "lat": -29.74750,
      "lng": -50.00681
    }
  },
  {
    "id": 6,
    "coord": {
      "lat": -29.74386,
      "lng": -50.00196
    }
  },
  {
    "id": 7,
    "coord": {
      "lat": -29.74864,
      "lng": -50.00827
    }
  },
  {
    "id": 8,
    "coord": {
      "lat": -29.74542,
      "lng": -50.00754
    }
  },
  {
    "id": 9,
    "coord": {
      "lat": -29.74765,
      "lng": -50.00531
    }
  },
  {
    "id": 10,
    "coord": {
      "lat": -29.74833,
      "lng": -50.00398
    }
  }
];
  
}

