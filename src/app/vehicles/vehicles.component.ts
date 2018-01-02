import { VehicleService } from '../vehicle.service';
import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss'],
  animations: [

    trigger('vehicles', [
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
    export class VehiclesComponent implements OnInit {
      vehicles=[];
      new_vehicle = {};
      msg: string;

      constructor(private _vehicleService: VehicleService) {

      }

      ngOnInit() {
        this._vehicleService.getVehicles()
        .subscribe(res => this.vehicles = res);
      }

      addVehicle(vehicle) {
        this.new_vehicle = {}
        this.vehicles.push(vehicle)
        this._vehicleService.addVehicles(vehicle)
        .subscribe(res => {
        },
        err => {
          console.log(err );
        })
      }



    }
