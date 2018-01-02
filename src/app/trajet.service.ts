import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()

export class TrajetService {

  constructor(private _http: Http) { }

  result:any;
  getTrajets() {
    return this._http.get("/api/trajets")
    .map(result => this.result = result.json().data);
  }

  addTrajets(trajet) {
    return this._http.post("/api/trajets",trajet)
    .map(result => this.result = result.json().data);
  }

}
