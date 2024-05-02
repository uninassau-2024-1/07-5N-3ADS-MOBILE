import { Component } from '@angular/core';
import { TicketService } from '../services/senha.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {



  constructor(public ticketService: TicketService) {}

}
