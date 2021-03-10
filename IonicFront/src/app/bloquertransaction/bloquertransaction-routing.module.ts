import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BloquertransactionPage } from './bloquertransaction.page';

const routes: Routes = [
  {
    path: '',
    component: BloquertransactionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BloquertransactionPageRoutingModule {}
