import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import {FooterPageModule} from '../footer/footer.module';
import {TabsPageModule} from '../tabs/tabs.module';
import {ClientPageModule} from '../client/client.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    FooterPageModule,
    TabsPageModule,
    ClientPageModule,
  ],
  declarations: [FolderPage]
})
export class FolderPageModule {}
