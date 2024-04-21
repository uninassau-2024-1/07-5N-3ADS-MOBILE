import { Injectable } from '@angular/core';

type Senha = {
  'icon': String,
  'color': String,
  'numero': String,
  'gm_timestamp': String,
  'fn_timestamp'?: String,
  'atendido'?: boolean
}

type ListaSenhas = {
  'SG': Senha[],
  'NSG': number
  'SE': Senha[],
  'NSE': number
  'SP': Senha[],
  'NSP': number,
  'NT': number,
  'SC'?: Senha
}



@Injectable({
  providedIn: 'root'
})

export class SenhaService {
  
  public senhasAtendidas: Senha[] = []
  public ultimas5Atendidas: Senha[] = []
  public listaSenhas: ListaSenhas = {
    'SG': [],
    'NSG': 0,
    'SE': [],
    'NSE': 0,
    'SP': [],
    'NSP': 0,
    'NT': 0,
  }
 

  public newDay(){
    localStorage.clear()
    location.reload()
  }

  public gerarSenha(tipoSenha: String = ''){
    var data = new Date()

    if(tipoSenha == 'SG'){
      this.listaSenhas.NSG++
      this.listaSenhas.NT++
      var senha: Senha = {
        'icon': 'person',
        'color': 'primary',
        'numero': `${this.getformatDate(data)}-SG${this.formatNumber(this.listaSenhas.NSG)}`,
        'gm_timestamp': `${this.getTimeStamp(data)}`
      }
      this.listaSenhas.SC = senha
      this.listaSenhas.SG.push(senha)
      this.saveProgress(this.listaSenhas.SG, "SG")
      this.saveProgressNumber(this.listaSenhas.NSG, "NSG")
    }

    if(tipoSenha == 'SP'){
      this.listaSenhas.NSP++
      this.listaSenhas.NT++
      var senha: Senha = {
        'icon': 'bandage',
        'color': 'success',
        'numero': `${this.getformatDate(data)}-SP${this.formatNumber(this.listaSenhas.NSP)}`,
        'gm_timestamp': `${this.getTimeStamp(data)}`
      }
      this.listaSenhas.SC = senha
      this.listaSenhas.SP.push(senha)
      this.saveProgress(this.listaSenhas.SP, "SP")
      this.saveProgressNumber(this.listaSenhas.NSP, "NSP")
    }

    if(tipoSenha =='SE'){
      this.listaSenhas.NSE++
      this.listaSenhas.NT++
      var senha: Senha = {
        'icon': 'document',
        'color': 'warning',
        'numero': `${this.getformatDate(data)}-SE${this.formatNumber(this.listaSenhas.NSE)}`,
        'gm_timestamp': `${this.getTimeStamp(data)}`
      }
      this.listaSenhas.SC = senha
      this.listaSenhas.SE.push(senha)
      this.saveProgress(this.listaSenhas.SE, "SE")
      this.saveProgressNumber(this.listaSenhas.NSE, "NSE")
    }
    this.saveProgressNumber(this.listaSenhas.NT, "NT")
  }

  public formatNumber(n: number){
    var formattedNumber = ''
    if(n < 10){formattedNumber = '0'+ n.toString()}
    else{formattedNumber = n.toString()}
    return formattedNumber
  }

  public getformatDate(data: Date){
    var reducedYear = data.getFullYear().toString().slice(2,4)
    var month = data.getMonth() + 1
    var day = data.getDate()
    return `${reducedYear}${this.formatNumber(month)}${this.formatNumber(day)}`
  }

  public getTimeStamp(data: Date){
    return data.getTime().toString()
  }
  
  public callNextTicket(){
    if(this.listaSenhas.SE.length > 0 && this.listaSenhas.SP.length < 1 && this.listaSenhas.SG.length < 1 || this.listaSenhas.SE.length > 0 && this.checkLastTicket("SP") || this.listaSenhas.SE.length > 0 && this.listaSenhas.SP.length < 1 && !this.senhasAtendidas[0]){
      var senha = this.returnFirst(this.listaSenhas.SE)
      senha.atendido = true
      senha = this.getFinalTimeStamp(senha)
      this.senhasAtendidas.push(senha)
      this.saveProgress(this.listaSenhas.SE, "SE")
      this.saveProgress(this.senhasAtendidas, "SA")
    }
    else if((this.listaSenhas.SE.length < 1 && this.listaSenhas.SG.length < 1 && this.listaSenhas.SP.length > 0 ) || this.listaSenhas.SP.length > 0 && (this.checkLastTicket("SG") || this.checkLastTicket("SE")) || this.listaSenhas.SP.length > 0 && !this.senhasAtendidas[0]){
      var senha = this.returnFirst(this.listaSenhas.SP)
      senha.atendido = true
      senha = this.getFinalTimeStamp(senha)
      this.senhasAtendidas.push(senha)
      this.saveProgress(this.listaSenhas.SP, "SP")
      this.saveProgress(this.senhasAtendidas, "SA")
    }
    else if((this.listaSenhas.SE.length < 1 && this.listaSenhas.SP.length < 1 && this.listaSenhas.SG.length > 0) || this.listaSenhas.SE.length < 1 && this.listaSenhas.SG.length > 0 && (this.checkLastTicket("SP")) || this.listaSenhas.SG.length > 0 && this.listaSenhas.SP.length < 1 && this.listaSenhas.SE.length < 1 && !this.senhasAtendidas[0]){
      var senha = this.returnFirst(this.listaSenhas.SG)
      senha.atendido = true
      senha = this.getFinalTimeStamp(senha)
      this.senhasAtendidas.push(senha)
      this.saveProgress(this.listaSenhas.SG, "SG")
      this.saveProgress(this.senhasAtendidas, "SA")
    }
    if(this.senhasAtendidas.length > 0){
      this.getLast5Tickets()
    }
  }

  public getLast5Tickets(){
    if(this.senhasAtendidas.length > 5){
      this.ultimas5Atendidas = this.senhasAtendidas.slice(this.senhasAtendidas.length - 5, this.senhasAtendidas.length)
    }
    else if(this.senhasAtendidas.length == 0){
      console.log("Array vazio!")
    }
    else if(this.senhasAtendidas.length < 5){
      this.ultimas5Atendidas = this.senhasAtendidas
    }
  }
  
  public returnFirst(array: Senha[]){
    var result
    if(array.length > 0){
    result = array.shift()
    }
    
    if(result == undefined){ throw new Error("Not Found")}
    else{
    return result
    }
  }

  public checkLastTicket(type: string){
    var senhasAtendidasLastPosition = this.senhasAtendidas.length - 1
    var lastIteration = this.senhasAtendidas[senhasAtendidasLastPosition]
    if(!lastIteration){
      return false
    }
    else if(lastIteration.numero.includes(type)){
      return true
    }
    else{
      return false
    }
  }

  public getFinalTimeStamp(senha: Senha){
    var data = new Date()
    var timestamp = data.getTime().toString()
    senha.fn_timestamp = timestamp
    return senha
  }

  public saveProgress(array: Senha[], str: string){
    localStorage.removeItem(str)
    localStorage.setItem(str, JSON.stringify(array))
  }

  public saveProgressNumber(n: number, str: string){
    localStorage.removeItem(str)
    localStorage.setItem(str, JSON.stringify(n))
  }

  public loadProgress(){
    if(localStorage.getItem("SG") || localStorage.getItem("SP") || localStorage.getItem("SE") || localStorage.getItem("SA")){
      this.listaSenhas.SG = JSON.parse(localStorage.getItem("SG") || "[]")
      this.listaSenhas.SP = JSON.parse(localStorage.getItem("SP") || "[]")
      this.listaSenhas.SE = JSON.parse(localStorage.getItem("SE") || "[]")
      this.listaSenhas.NSG = JSON.parse(localStorage.getItem("NSG") || "0")
      this.listaSenhas.NSP = JSON.parse(localStorage.getItem("NSP") || "0")
      this.listaSenhas.NSE = JSON.parse(localStorage.getItem("NSE") || "0")
      this.listaSenhas.NT = JSON.parse(localStorage.getItem("NT") || "0")
      this.senhasAtendidas = JSON.parse(localStorage.getItem("SA") || "[]")
    }
  }
  constructor() { this.loadProgress()}
}
