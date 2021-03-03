import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccueilPage } from './accueil.page';
import {ConnexionPageModule} from '../connexion/connexion.module';

const routes: Routes = [
  {
    path: '',
    component: AccueilPage
  },
  {path: 'login_check', component: ConnexionPageModule}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccueilPageRoutingModule {}
