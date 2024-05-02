import { Component } from '@angular/core';

import { senhasService } from '../service/senhas-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  inputNewPassword: string = ''

  constructor(public senhasService: senhasService) { }

}
