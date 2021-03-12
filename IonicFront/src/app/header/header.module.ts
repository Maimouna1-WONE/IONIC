import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderPageRoutingModule } from './header-routing.module';
import { HeaderPage } from './header.page';
import {FooterPageModule} from '../footer/footer.module';
import {SeparatorPipe} from '../pipes/separator.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderPageRoutingModule,
    FooterPageModule
  ],
    exports: [
        HeaderPage, SeparatorPipe
    ],
    declarations: [HeaderPage, SeparatorPipe]
})
export class HeaderPageModule {}
