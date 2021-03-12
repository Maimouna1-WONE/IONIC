import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepotPageRoutingModule } from './depot-routing.module';

import { DepotPage } from './depot.page';
import {HeaderPageModule} from '../header/header.module';
import {FooterPageModule} from '../footer/footer.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DepotPageRoutingModule,
        HeaderPageModule,
        FooterPageModule,
        ReactiveFormsModule
    ],
  declarations: [DepotPage]
})
export class DepotPageModule {}
