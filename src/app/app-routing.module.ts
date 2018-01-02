import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrajetsComponent } from './trajets/trajets.component';
import { AuthComponent } from './auth/auth.component';
import { TrajetTypesComponent } from './trajetTypes/trajetTypes.component';
import { VehiclesComponent } from './vehicles/vehicles.component';


const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'trajets',
    component: TrajetsComponent
  },
  {
    path: 'users',
    component: AuthComponent
  },
  {
    path: 'trajetTypes',
    component: TrajetTypesComponent
  },
  {
    path: 'vehicle',
    component: VehiclesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
