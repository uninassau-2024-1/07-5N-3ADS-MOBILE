import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelatorioDetalhadoPage } from './relatorio-detalhado.page';

const routes: Routes = [
  {
    path: '',
    component: RelatorioDetalhadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelatorioDetalhadoPageRoutingModule {}
