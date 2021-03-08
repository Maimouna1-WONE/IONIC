import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConnexionPageRoutingModule } from './connexion-routing.module';

import { ConnexionPage } from './connexion.page';
import {HttpClientModule} from '@angular/common/http';
import {HeaderPageModule} from "../header/header.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ConnexionPageRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        HeaderPageModule
    ],
  declarations: [ConnexionPage]
})
export class ConnexionPageModule {}
