import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { senhasService } from '../service/senhas-service.service';

@Component({
  selector: 'app-relatorio-detalhado',
  templateUrl: './relatorio-detalhado.page.html',
  styleUrls: ['./relatorio-detalhado.page.scss'],
})
export class RelatorioDetalhadoPage implements OnInit {

  constructor(private router: Router, public senhasService: senhasService) { }

  voltar() {
    this.router.navigate(['/tabs/tab2'])
  }


  ngOnInit() {
  }

}