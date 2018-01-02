import { AuthService } from '../auth.service';
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

      constructor( private _authService: AuthService) {

      }

      ngOnInit() {
      }

      addUser(user) {
        this.new_user = {}
        this._authService.addUsers(user)
        .subscribe(res => {
        },
        err => {
          console.log(err );
        })
      }

      login(user) {
        this.user = {}
        this._authService.login(user)
        .subscribe(res => {
        },
        err => {
          console.log(err );
        })
      }



    }
