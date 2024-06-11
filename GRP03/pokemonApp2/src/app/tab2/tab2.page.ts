import { Component, OnInit } from '@angular/core';
import { PokeAPIService } from './../services/poke-api.service';
import { DataSharingService } from '../services/data-sharing.service';
import { PhotoService } from '../services/photo.service'; // Import PhotoService

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  pokemonTab2: any;
  comparisonResult: 'Ganhou' | 'Perdeu' | 'Empate' = 'Empate';
  nameColor: string = '';

  constructor(
    private pokeAPIService: PokeAPIService,
    private dataSharingService: DataSharingService,
    public photoService: PhotoService // Maintain the PhotoService
  ) {}

  ngOnInit() {
    this.loadRandomPokemon();
  }

  loadRandomPokemon() {
    this.pokeAPIService.getRandomPokemon().subscribe(data => {
      this.pokemonTab2 = data;
      this.comparePokemons();
    });
  }

  comparePokemons() {
    const pokemonTab1 = this.dataSharingService.getPokemon();
    if (pokemonTab1 && this.pokemonTab2) {
      const abilitiesTab1 = pokemonTab1.abilities.length;
      const abilitiesTab2 = this.pokemonTab2.abilities.length;

      if (abilitiesTab1 === abilitiesTab2) {
        this.comparisonResult = 'Empate';
        this.nameColor = 'yellow';
      } else if (abilitiesTab2 > abilitiesTab1) {
        this.comparisonResult = 'Perdeu';
        this.nameColor = 'red';
      } else {
        this.comparisonResult = 'Ganhou';
        this.nameColor = 'green';
      }

      this.dataSharingService.updateStatistics(this.comparisonResult);
    }
  }

  addPhotoToGallery(){
    this.photoService.addNewToGallery();
  }
}
