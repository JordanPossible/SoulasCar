import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()

export class UserService {

  constructor(private _http: Http) { }

  result:any;

  getUsers() {
    return this._http.get("/api/users")
    .map(result => this.result = result.json().data);
  }

}
