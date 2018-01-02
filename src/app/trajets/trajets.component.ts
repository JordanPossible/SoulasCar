import { TrajetService } from '../trajet.service';
import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'app-trajets',
  templateUrl: './trajets.component.html',
  styleUrls: ['./trajets.component.scss'],
  animations: [

    trigger('trajets', [
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
    export class TrajetsComponent implements OnInit {
      trajets=[];
      new_trajet = {};
      msg: string;

      constructor(private _trajetService: TrajetService) {

      }

      ngOnInit() {
        this._trajetService.getTrajets()
        .subscribe(res => this.trajets = res);
      }

      addTrajet(trajet) {
        this.new_trajet = {}
        this.trajets.push(trajet)
        this._trajetService.addTrajets(trajet)
        .subscribe(res => {
        },
        err => {
          console.log(err );
        })
      }



    }
