import { Injectable } from '@angular/core';

type Ticket = {
  'icon': String,
  'color': String,
  'number': String,
  'gen_timestamp': String,
  'fin_timestamp'?: String,
  'finished'?: boolean
}

type ListaTickets = {
  'SG': Ticket[],
  'NSG': number
  'SE': Ticket[],
  'NSE': number
  'SP': Ticket[],
  'NSP': number,
  'NT': number,
  'SC'?: Ticket,
  'FTN': number,
  'ATF': String
}



@Injectable({
  providedIn: 'root'
})

export class TicketService {

  private finishedTickets: Ticket[] = []
  public last5ConcludedTickets: Ticket[] = []
  public ticketList: ListaTickets = {
    'SG': [],
    'NSG': 0,
    'SE': [],
    'NSE': 0,
    'SP': [],
    'NSP': 0,
    'NT': 0,
    'FTN': 0,
    'ATF': "0"
  }


  public newDay() {
    localStorage.clear()
    location.reload()
  }

  public generateTicket(typeTicket: String = '') {
    var date = new Date()

    if (typeTicket == 'SG') {
      this.ticketList.NSG++
      this.ticketList.NT++
      var ticket: Ticket = {
        'icon': 'person',
        'color': 'primary',
        'number': `${this.getFormattedDate(date)}-SG${this.formatNumber(this.ticketList.NSG)}`,
        'gen_timestamp': `${this.getInitialTimeStamp(date)}`
      }
      this.ticketList.SC = ticket
      this.ticketList.SG.push(ticket)
      this.saveProgress(this.ticketList.SG, "SG")
      this.saveProgressNumber(this.ticketList.NSG, "NSG")
    }

    if (typeTicket == 'SP') {
      this.ticketList.NSP++
      this.ticketList.NT++
      var ticket: Ticket = {
        'icon': 'bandage',
        'color': 'success',
        'number': `${this.getFormattedDate(date)}-SP${this.formatNumber(this.ticketList.NSP)}`,
        'gen_timestamp': `${this.getInitialTimeStamp(date)}`
      }
      this.ticketList.SC = ticket
      this.ticketList.SP.push(ticket)
      this.saveProgress(this.ticketList.SP, "SP")
      this.saveProgressNumber(this.ticketList.NSP, "NSP")
    }

    if (typeTicket == 'SE') {
      this.ticketList.NSE++
      this.ticketList.NT++
      var ticket: Ticket = {
        'icon': 'document',
        'color': 'warning',
        'number': `${this.getFormattedDate(date)}-SE${this.formatNumber(this.ticketList.NSE)}`,
        'gen_timestamp': `${this.getInitialTimeStamp(date)}`
      }
      this.ticketList.SC = ticket
      this.ticketList.SE.push(ticket)
      this.saveProgress(this.ticketList.SE, "SE")
      this.saveProgressNumber(this.ticketList.NSE, "NSE")
    }
    this.saveProgressNumber(this.ticketList.NT, "NT")
  }

  public formatNumber(n: number) {
    var formattedNumber = ''
    if (n < 10) { formattedNumber = '0' + n.toString() }
    else { formattedNumber = n.toString() }
    return formattedNumber
  }

  public callNextTicket() {
    if (this.ticketList.SE.length > 0 && this.ticketList.SP.length < 1 && this.ticketList.SG.length < 1 || this.ticketList.SE.length > 0 && this.checkLastTicket("SP") || this.ticketList.SE.length > 0 && this.ticketList.SP.length < 1 && !this.finishedTickets[0]) {
      var ticket = this.returnFirst(this.ticketList.SE)
      ticket.finished = true
      ticket = this.getFinalTimeStamp(ticket)
      this.finishedTickets.push(ticket)
      this.saveProgress(this.ticketList.SE, "SE")
      this.saveProgress(this.finishedTickets, "SA")
      this.ticketList.FTN++
    }
    else if ((this.ticketList.SE.length < 1 && this.ticketList.SG.length < 1 && this.ticketList.SP.length > 0) || this.ticketList.SP.length > 0 && (this.checkLastTicket("SG") || this.checkLastTicket("SE")) || this.ticketList.SP.length > 0 && !this.finishedTickets[0]) {
      var ticket = this.returnFirst(this.ticketList.SP)
      ticket.finished = true
      ticket = this.getFinalTimeStamp(ticket)
      this.finishedTickets.push(ticket)
      this.saveProgress(this.ticketList.SP, "SP")
      this.saveProgress(this.finishedTickets, "SA")
      this.ticketList.FTN++
    }
    else if ((this.ticketList.SE.length < 1 && this.ticketList.SP.length < 1 && this.ticketList.SG.length > 0) || this.ticketList.SE.length < 1 && this.ticketList.SG.length > 0 && (this.checkLastTicket("SP")) || this.ticketList.SG.length > 0 && this.ticketList.SP.length < 1 && this.ticketList.SE.length < 1 && !this.finishedTickets[0]) {
      var ticket = this.returnFirst(this.ticketList.SG)
      ticket.finished = true
      ticket = this.getFinalTimeStamp(ticket)
      this.finishedTickets.push(ticket)
      this.saveProgress(this.ticketList.SG, "SG")
      this.saveProgress(this.finishedTickets, "SA")
      this.ticketList.FTN++
    }
    if (this.finishedTickets.length > 0) {
      this.getLast5Tickets()
    }
    this.saveProgressNumber(this.ticketList.FTN, "FTN")
    this.getAvgTimeToFinish()

  }

  public getLast5Tickets() {
    if (this.finishedTickets.length > 5) {
      this.last5ConcludedTickets = this.finishedTickets.slice(this.finishedTickets.length - 5, this.finishedTickets.length)
    }
    else if (this.finishedTickets.length == 0) {
      console.log("Array vazio!")
    }
    else if (this.finishedTickets.length < 5) {
      this.last5ConcludedTickets = this.finishedTickets
    }
  }

  public getFormattedDate(date: Date) {
    var reducedYear = date.getFullYear().toString().slice(2, 4)
    var month = date.getMonth() + 1
    var day = date.getDate()
    return `${reducedYear}${this.formatNumber(month)}${this.formatNumber(day)}`
  }

  public getInitialTimeStamp(date: Date) {
    return date.getTime().toString()
  }

  public returnFirst(array: Ticket[]) {
    var result
    if (array.length > 0) {
      result = array.shift()
    }
    if (result == undefined) { throw new Error("Not Found") }
    else {
      return result
    }
  }

  public checkLastTicket(type: string) {
    var finishedTicketsLastPosition = this.finishedTickets.length - 1
    var lastIteration = this.finishedTickets[finishedTicketsLastPosition]
    if (!lastIteration) {
      return false
    }
    else if (lastIteration.number.includes(type)) {
      return true
    }
    else {
      return false
    }
  }

  public getFinalTimeStamp(ticket: Ticket) {
    var date = new Date()
    var timestamp = date.getTime().toString()
    ticket.fin_timestamp = timestamp
    return ticket
  }

  public saveProgress(array: Ticket[], str: string) {
    localStorage.removeItem(str)
    localStorage.setItem(str, JSON.stringify(array))
  }

  public saveProgressNumber(n: number, str: string) {
    localStorage.removeItem(str)
    localStorage.setItem(str, JSON.stringify(n))
  }

  public getAvgTimeToFinish() {
    var avg = 0
    var result = ''
    if (this.finishedTickets.length > 0) {
      for (var ticket of this.finishedTickets) {
        avg += (Number(ticket.fin_timestamp) - Number(ticket.gen_timestamp)) / 1000
      }
      avg = (avg / 60) % 60
      avg = avg / this.finishedTickets.length

      result = `${Math.round(avg)}`
      this.ticketList.ATF = result

    }
  }
  public loadProgress() {
    if (localStorage.getItem("SG") || localStorage.getItem("SP") || localStorage.getItem("SE") || localStorage.getItem("SA")) {
      this.ticketList.SG = JSON.parse(localStorage.getItem("SG") || "[]")
      this.ticketList.SP = JSON.parse(localStorage.getItem("SP") || "[]")
      this.ticketList.SE = JSON.parse(localStorage.getItem("SE") || "[]")
      this.ticketList.NSG = JSON.parse(localStorage.getItem("NSG") || "0")
      this.ticketList.NSP = JSON.parse(localStorage.getItem("NSP") || "0")
      this.ticketList.NSE = JSON.parse(localStorage.getItem("NSE") || "0")
      this.ticketList.NT = JSON.parse(localStorage.getItem("NT") || "0")
      this.ticketList.FTN = JSON.parse(localStorage.getItem("FTN") || "0")
      this.finishedTickets = JSON.parse(localStorage.getItem("SA") || "[]")
    }
  }
  constructor() { this.loadProgress() }
}
