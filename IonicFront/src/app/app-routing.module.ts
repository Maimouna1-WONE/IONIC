import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './_helpers/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {path: 'login_check', loadChildren: () => import('./connexion/connexion.module').then( m => m.ConnexionPageModule),
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'accueil',
    loadChildren: () => import('./accueil/accueil.module').then( m => m.AccueilPageModule)
  },
  /*
  {
    path: 'connexion',
    loadChildren: () => import('./connexion/connexion.module').then( m => m.ConnexionPageModule)
  },
  */
  {
    path: 'transaction',
    loadChildren: () => import('./transaction/transaction.module').then( m => m.TransactionPageModule)
  },
  {
    path: 'commission',
    loadChildren: () => import('./commission/commission.module').then( m => m.CommissionPageModule)
  },
  {
    path: 'calculatrice',
    loadChildren: () => import('./calculatrice/calculatrice.module').then( m => m.CalculatricePageModule)
  },
  {
    path: 'depot',
    loadChildren: () => import('./depot/depot.module').then( m => m.DepotPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'header',
    loadChildren: () => import('./header/header.module').then( m => m.HeaderPageModule)
  },
  {
    path: 'retrait',
    loadChildren: () => import('./retrait/retrait.module').then( m => m.RetraitPageModule)
  },
  {
    path: 'footer',
    loadChildren: () => import('./footer/footer.module').then( m => m.FooterPageModule)
  },
  {
    path: 'client',
    loadChildren: () => import('./client/client.module').then( m => m.ClientPageModule)
  },
  {
    path: 'bloquertransaction',
    loadChildren: () => import('./bloquertransaction/bloquertransaction.module').then( m => m.BloquertransactionPageModule)
  },
  {
    path: 'transactionencours',
    loadChildren: () => import('./transactionencours/transactionencours.module').then( m => m.TransactionencoursPageModule)
  },
  {
    path: 'geolocalisation',
    loadChildren: () => import('./geolocalisation/geolocalisation.module').then( m => m.GeolocalisationPageModule)
  }
];

// @ts-ignore
// @ts-ignore
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
    // RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
