import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalculatricePageRoutingModule } from './calculatrice-routing.module';

import { CalculatricePage } from './calculatrice.page';
import {HeaderPageModule} from "../header/header.module";
import {FooterPageModule} from "../footer/footer.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CalculatricePageRoutingModule,
        HeaderPageModule,
        FooterPageModule,
        ReactiveFormsModule
    ],
  declarations: [CalculatricePage]
})
export class CalculatricePageModule {}
