import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//components (routing too)

import { TrajetsComponent } from './trajets/trajets.component';
import { TrajetTypesComponent } from './trajetTypes/trajetTypes.component';
import { AuthComponent } from './auth/auth.component';
import { VehiclesComponent } from './vehicles/vehicles.component';

//services
import { TrajetService } from './services/trajet.service';
import { TrajetTypeService } from './services/trajet-type.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { VehicleService } from './services/vehicle.service';


@NgModule({
  declarations: [
    AppComponent,
    TrajetsComponent,
    AuthComponent,
    TrajetTypesComponent,
    VehiclesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule
  ],
  providers: [
    TrajetService,
    TrajetTypeService,
    UserService,
    AuthService,
    VehicleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
