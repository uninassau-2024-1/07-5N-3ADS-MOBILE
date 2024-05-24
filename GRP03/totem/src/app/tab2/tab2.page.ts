import { Component } from '@angular/core';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  tmPrioritaria: number | null = null;
  tmGeral: number | null = null;

  constructor(public senhasService: SenhasService) {}

  chamarProximaSenha(): void {
    this.senhasService.chamarProximaSenha();
  }

  calcularTMPrioritaria(): void {
    this.tmPrioritaria = this.senhasService.calcularTMPrioritaria();
    console.log('TM Prioritária:', this.tmPrioritaria); 
  }

  calcularTMGeral(): void {
    this.tmGeral = this.senhasService.calcularTMGeral();
    console.log('TM Geral:', this.tmGeral); 
  }

  get ultimasSenhasChamadas(): string[] {
    return this.senhasService.ultimasSenhasChamadas;
  }
}
