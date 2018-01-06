import { TrajetTypeService } from '../services/trajet-type.service';
import { AuthService } from '../services/auth.service';
import {Router} from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'app-trajetTypes',
  templateUrl: './trajetTypes.component.html',
  styleUrls: ['./trajetTypes.component.scss'],
  animations: [

    trigger('trajetTypes', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('100ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
            style({opacity: 1, transform: 'translateY(0)', offset: 1}),
          ]))]), {optional: true}),

          query(':leave', stagger('100ms', [
            animate('.6s ease-in', keyframes([
              style({opacity: 1, transform: 'translateY(0)', offset: 0}),
              style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
              style({opacity: 0, transform: 'translateY(-75%)', offset: 1}),
            ]))]), {optional: true})
          ])
        ])

      ]
    })
    export class TrajetTypesComponent implements OnInit {
      trajetTypes=[];
      new_trajetType = {};
      msg: string;

      constructor(private _trajetTypeService: TrajetTypeService, private _authService: AuthService,private router: Router) {
        this._authService.me()
        .subscribe(res => {
          if(res.error){
            this.router.navigate(['/users'])
          }
        });
      }

      ngOnInit() {
        this._trajetTypeService.getTrajetTypes()
        .subscribe(res => this.trajetTypes = res);
      }

      addTrajetType(trajetType) {
        this.new_trajetType = {}
        this.trajetTypes.push(trajetType)
        this._trajetTypeService.addTrajetTypes(trajetType)
        .subscribe(res => {
        },
        err => {
          console.log(err );
        })
      }



    }
