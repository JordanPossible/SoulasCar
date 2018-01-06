import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()

export class AuthService {

  constructor(private _http: Http) { }

  result:any;
  addUsers(user) {
    return this._http.post("/api/sign_up",user)
    .map(result => this.result = result.json().data);
  }

  login(user) {
    return this._http.post("/api/sign_in",user)
    .map(result => this.result = result.json().data);
  }

  me() {
    return this._http.get("/api/me")
    .map(result => this.result = result.json());
  }

  logout() {
    return this._http.get("/api/logout")
    .map(result => this.result = result);
  }

}
