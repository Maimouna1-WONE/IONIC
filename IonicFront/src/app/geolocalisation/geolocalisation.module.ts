import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeolocalisationPageRoutingModule } from './geolocalisation-routing.module';

import { GeolocalisationPage } from './geolocalisation.page';
import {HeaderPageModule} from "../header/header.module";
import {FooterPageModule} from "../footer/footer.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeolocalisationPageRoutingModule,
    HeaderPageModule,
    FooterPageModule
  ],
  declarations: [GeolocalisationPage]
})
export class GeolocalisationPageModule {}
