import { Component } from '@angular/core';
import { IonCard, IonCardContent, IonCardHeader, IonList, IonItem, IonButton, IonIcon, IonLabel } from '@ionic/angular';
import { SenhaService } from '../services/senha.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public senhaService: SenhaService) {}

 
}
