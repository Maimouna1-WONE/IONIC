import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalculatricePage } from './calculatrice.page';

const routes: Routes = [
  {
    path: '',
    component: CalculatricePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalculatricePageRoutingModule {}
