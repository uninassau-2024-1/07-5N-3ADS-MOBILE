import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RelatorioDetalhadoPageRoutingModule } from './relatorio-detalhado-routing.module';

import { RelatorioDetalhadoPage } from './relatorio-detalhado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RelatorioDetalhadoPageRoutingModule
  ],
  declarations: [RelatorioDetalhadoPage]
})
export class RelatorioDetalhadoPageModule {}
