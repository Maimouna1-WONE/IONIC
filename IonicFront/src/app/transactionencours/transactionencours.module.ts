import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionencoursPageRoutingModule } from './transactionencours-routing.module';

import { TransactionencoursPage } from './transactionencours.page';
import {HeaderPageModule} from "../header/header.module";
import {FooterPageModule} from "../footer/footer.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionencoursPageRoutingModule,
    HeaderPageModule,
    FooterPageModule
  ],
  declarations: [TransactionencoursPage]
})
export class TransactionencoursPageModule {}
