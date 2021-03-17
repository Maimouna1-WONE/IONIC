import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeolocalisationPage } from './geolocalisation.page';

const routes: Routes = [
  {
    path: '',
    component: GeolocalisationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeolocalisationPageRoutingModule {}
