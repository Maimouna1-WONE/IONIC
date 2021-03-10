import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BloquertransactionPageRoutingModule } from './bloquertransaction-routing.module';

import { BloquertransactionPage } from './bloquertransaction.page';
import {HeaderPageModule} from "../header/header.module";
import {FooterPageModule} from "../footer/footer.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BloquertransactionPageRoutingModule,
    HeaderPageModule,
    FooterPageModule,
    ReactiveFormsModule
  ],
  declarations: [BloquertransactionPage]
})
export class BloquertransactionPageModule {}
