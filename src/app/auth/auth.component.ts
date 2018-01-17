import { AuthService } from '../services/auth.service';
import {Router} from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  new_user = {};
  user = {};

  constructor(private _authService: AuthService,private router: Router) {
    this._authService.me()
    .subscribe(res => {
      if(!res.error){
        this.router.navigate(['/vehicles'])
      }
    });
  }

  ngOnInit() {
  }

  addUser(user) {
    this.new_user = {}
    this._authService.addUsers(user)
    .subscribe(res => {
      this.router.navigate(['/vehicles'])
    },
    err => {
      console.log(err );
    })
  }

  login(user) {
    this.user = {}
    this._authService.login(user)
    .subscribe(res => {
      this.router.navigate(['/vehicles'])
    },
    err => {
      console.log(err );
    })
  }
}
