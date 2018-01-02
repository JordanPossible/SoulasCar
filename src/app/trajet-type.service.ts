import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()

export class TrajetTypeService {

  constructor(private _http: Http) { }

  result:any;
  getTrajetTypes() {

    return this._http.get("/api/trajetTypes")
    .map(result => this.result = result.json().data);
  }

  addTrajetTypes(trajetType) {
    return this._http.post("/api/trajetTypes",trajetType)
    .map(result => this.result = result.json().data);
  }

}
