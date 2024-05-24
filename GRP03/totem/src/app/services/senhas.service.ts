import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SenhasService {
  public senhasGeral: number = 0;
  public senhasPrior: number = 0;
  public senhasExame: number = 0;
  public senhasTotal: number = 0;
  public ultimasSenhasChamadas: string[] = [];

  constructor() {}

  somaGeral() {
    this.senhasGeral++;
    this.senhasTotal++;
  }
  
  somaPrior() {
    this.senhasPrior++;
    this.senhasTotal++;
  }
  
  somaExame() {
    this.senhasExame++;
    this.senhasTotal++;
  }

  chamarProximaSenha() {

    if (this.ultimasSenhasChamadas.length > 0) {
      const proximaSenha = this.ultimasSenhasChamadas.shift();

    }
  }

  calcularTMPrioritaria(): number {
    let totalTempoPrioritarias = 0;
    let quantidadePrioritarias = 0;

    this.ultimasSenhasChamadas.forEach(senha => {
      if (senha.startsWith('SP')) {
        totalTempoPrioritarias += this.calcularTempoSenha(senha);
        quantidadePrioritarias++;
      }
    });

    return quantidadePrioritarias > 0 ? totalTempoPrioritarias / quantidadePrioritarias : 0;
  }

  calcularTMGeral(): number {
    let totalTempoGeral = 0;
    let quantidadeSenhas = 0;

    this.ultimasSenhasChamadas.forEach(senha => {
      totalTempoGeral += this.calcularTempoSenha(senha);
      quantidadeSenhas++;
    });

    return quantidadeSenhas > 0 ? totalTempoGeral / quantidadeSenhas : 0;
  }

  novaSenha(tipoSenha: string = '') {
    if (tipoSenha === 'SG') {
      this.somaGeral();
      const novaSenha = this.gerarNovaSenha(tipoSenha);
      this.ultimasSenhasChamadas.push(novaSenha);
    } else if (tipoSenha === 'SP') {
      this.somaPrior();
      const novaSenha = this.gerarNovaSenha(tipoSenha);
      this.ultimasSenhasChamadas.push(novaSenha);
    } else if (tipoSenha === 'SE') {
      this.somaExame();
      const novaSenha = this.gerarNovaSenha(tipoSenha);
      this.ultimasSenhasChamadas.push(novaSenha);
    }
  }

  private gerarNovaSenha(tipoSenha: string): string {
    return `${new Date().getFullYear().toString().substring(2, 4)}${(new Date().getMonth() + 1).toString().padStart(2, '0')}${new Date().getDate().toString().padStart(2, '0')}-${tipoSenha}${(this.ultimasSenhasChamadas.length + 1).toString().padStart(2, '0')}`;
  }

  private calcularTempoSenha(senha: string): number {
    return senha.length * 2; 
  }
}
