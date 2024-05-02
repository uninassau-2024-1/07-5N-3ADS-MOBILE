import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class senhasService {

  public inputNovaSenha: string = ''
  public ultimaSenha: string = "";

  senhasArray: { [key: string]: string[] } = {
    "SG": [],
    "SP": [],
    "SE": []
  };

 

  public senhasGeral: number = 0
  public senhasPrior: number = 0
  public senhasExame: number = 0
  public senhasTotal: number = 0

  public atendidasPrior: number = 0
  public atendidasExame: number = 0
  public atendidasGeral: number = 0
  public atendidasTotal: number = 0

  public senhasChamadas: string[] = []

  somaGeral() { this.senhasGeral++; this.senhasTotal++ }
  somaPrior() { this.senhasPrior++; this.senhasTotal++ }
  somaExame() { this.senhasExame++; this.senhasTotal++ }

  atenderPrior() { this.atendidasPrior++, this.atendidasTotal++ }
  atenderExame() { this.atendidasExame++, this.atendidasTotal++ }
  atenderGeral() { this.atendidasGeral++, this.atendidasTotal++ }


  senhasRegistradas: Senha[] = [];
  senhasAtendidas: Senha[] = []

  novaSenha(typePass: string) {
    if (typePass == "SG") {
      this.somaGeral();
      const dataEmissao = new Date()
      const tempoSG: string = (Math.floor(Math.random() * 7) + 2).toString()
      const numeroSenha =
        new Date().getFullYear().toString().substring(2, 4) +
        (new Date().getMonth() + 1).toString().padStart(2, '0') +
        new Date().getDate().toString().padStart(2, '0') + "-" +
        typePass +
        (this.senhasArray["SG"].length + 1).toString().padStart(2, '0');
      const senha = new Senha(numeroSenha, typePass, dataEmissao, new Date(0), "", tempoSG);
      this.senhasArray["SG"].push(numeroSenha);
      this.senhasRegistradas.push(senha);
      this.exibirAlerta(numeroSenha);

      console.log(this.senhasArray);
    } else if (typePass == "SP") {
      this.somaPrior();
      const dataEmissao = new Date();
      const tempoSP: string = (Math.floor(Math.random() * 11) + 10).toString()
      const numeroSenha =
        new Date().getFullYear().toString().substring(2, 4) +
        (new Date().getMonth() + 1).toString().padStart(2, '0') +
        new Date().getDate().toString().padStart(2, '0') + "-" +
        typePass +
        (this.senhasArray["SP"].length + 1).toString().padStart(2, '0');
      const senha = new Senha(numeroSenha, typePass, dataEmissao, new Date(0), "", tempoSP);
      this.senhasArray["SP"].push(numeroSenha);
      this.senhasRegistradas.push(senha);
      this.exibirAlerta(numeroSenha);
      console.log(this.senhasArray);
    } else if (typePass == "SE") {
      this.somaExame();
      const dataEmissao = new Date();
      const numeroSenha =
        new Date().getFullYear().toString().substring(2, 4) +
        (new Date().getMonth() + 1).toString().padStart(2, '0') +
        new Date().getDate().toString().padStart(2, '0') + "-" +
        typePass +
        (this.senhasArray["SE"].length + 1).toString().padStart(2, '0');
      const senha = new Senha(numeroSenha, typePass, dataEmissao, new Date(0), "", "1");
      this.senhasArray["SE"].push(numeroSenha);
      this.senhasRegistradas.push(senha);
      this.exibirAlerta(numeroSenha);
      console.log(this.senhasArray);
    }
  }

  async exibirAlerta( senha : string) {
    const alert = await this.alertController.create({
      header: 'Mensagem',
      message: 'Senha Geral Emitida '+ senha,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  async exibirAlertaAtendimeno() {
    const alert = await this.alertController.create({
      header: 'Mensagem',
      message: 'Senha atendida',
      buttons: ['OK']
    });
  
    await alert.present();
  }

  atenderSenha(guiche: string) {
    const tiposPrioritarios = ["SP", "SE", "SG"];

    for (let tipo of tiposPrioritarios) {
      if (this.senhasArray[tipo].length) {
        const senhaChamada = this.senhasArray[tipo][0];

        if (senhaChamada) {
          const senhaRegistrada = this.senhasRegistradas.find(s => s.numero === senhaChamada);
          if (senhaRegistrada) {
            senhaRegistrada.dataAtendimento = new Date();
            senhaRegistrada.guicheAtendimento = guiche;
            this.salvarSenhaAtendida(senhaChamada, tipo, senhaRegistrada.dataEmissao, senhaRegistrada.dataAtendimento, senhaRegistrada.guicheAtendimento, senhaRegistrada.tempo);
            ////this.exibirAlertaAtendimeno;   
          }


          
          this.senhasArray[tipo].shift();
          this.ultimaSenha = tipo;

          //this.exibirAlertaAtendimeno;   

          if (this.senhasChamadas.length < 5) {
            this.senhasChamadas.push(senhaChamada);
            console.log('preenchido');
            //this.exibirAlertaAtendimeno;   
          } else if (this.senhasChamadas.length >= 5) {
            this.senhasChamadas.push(senhaChamada);
            this.senhasChamadas.shift();
            //this.exibirAlertaAtendimeno;   
            console.log("vazio");
          }

          if (tipo === "SP") {       
           this.atenderPrior;                                       
          } else if (tipo === "SE") {
            this.atenderExame();
          } else if (tipo === "SG") {
            this.atenderGeral();
          }

          console.log(this.senhasChamadas);
          return;
        }
      }
    }

    console.log("Acabou");
  }


  salvarSenhaAtendida(numeroSenha: string, tipo: string, dataEmissao: Date, dataAtendimento: Date, guicheAtendimento: string, tempo: string) {
    const senha = new Senha(numeroSenha, tipo, dataEmissao, dataAtendimento, guicheAtendimento, tempo);
    this.senhasAtendidas.push(senha);
    ////this.exibirAlertaAtendimeno;   
  }


  constructor(private alertController: AlertController) { }
  
}

class Senha {
  numero: string;
  tipo: string;
  dataEmissao: Date;
  dataAtendimento: Date;
  guicheAtendimento: string;
  tempo: string;

  constructor(numero: string, tipo: string, dataEmissao: Date, dataAtendimento: Date, guicheAtendimento: string, tempo: string) {
    this.numero = numero;
    this.tipo = tipo;
    this.dataEmissao = dataEmissao;
    this.dataAtendimento = dataAtendimento;
    this.guicheAtendimento = guicheAtendimento;
    this.tempo = tempo;
  }
}