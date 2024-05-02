import { Component } from '@angular/core';

import { senhasService } from '../service/senhas-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public senhasService: senhasService, private router: Router) { }

  relatorioDetalhado() {
    this.router.navigate(['/relatorio-detalhado'])
  }

}
