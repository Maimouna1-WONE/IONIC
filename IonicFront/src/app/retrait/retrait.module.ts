import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RetraitPageRoutingModule } from './retrait-routing.module';
import { RetraitPage } from './retrait.page';
import {HeaderPageModule} from '../header/header.module';
import {FooterPageModule} from '../footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RetraitPageRoutingModule,
    HeaderPageModule,
    FooterPageModule,
    ReactiveFormsModule
  ],
  declarations: [RetraitPage]
})
export class RetraitPageModule {}
