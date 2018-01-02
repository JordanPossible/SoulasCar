import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class VehicleService {

  constructor(private _http: Http) { }

  result:any;
  getVehicles() {

    return this._http.get("/api/vehicles")
    .map(result => this.result = result.json().data);
  }

  addVehicles(vehicle) {
    return this._http.post("/api/vehicles",vehicle)
    .map(result => this.result = result.json().data);
  }
}
