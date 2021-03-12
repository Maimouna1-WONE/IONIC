import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionPageRoutingModule } from './transaction-routing.module';

import { TransactionPage } from './transaction.page';
import {HeaderPageModule} from '../header/header.module';
import {FooterPageModule} from '../footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionPageRoutingModule,
    HeaderPageModule,
    FooterPageModule
  ],
  declarations: [TransactionPage]
})
export class TransactionPageModule {}
