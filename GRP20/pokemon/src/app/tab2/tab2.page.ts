import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { PokeAPIService } from '../services/poke-api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  pokemon: any = {
    name: '',
    abilities: '',
    sprites: {
      front_default: ''
    },
    height: '',
    weight: '',
  }
  userPokeAbilities: Number = 0;
  result: any = {
    name: ""
  };

  constructor(public photoService: PhotoService, private pokeAPIService: PokeAPIService) {}
  
  ionViewDidEnter() {
    this.generatePokemon();
    setTimeout(() => this.getResult(), 5000);
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  generatePokemon() {
    this.pokeAPIService.getPokeAPIService()
        .subscribe((value) => {
          this.pokemon.name = JSON.parse(JSON.stringify(value)) ['name'];
          this.pokemon.sprites.front_default = JSON.parse(JSON.stringify(value)) ['sprites']['front_default'];
          this.pokemon.abilities = JSON.parse(JSON.stringify(value)) ["abilities"].length;
          this.pokemon.height = JSON.parse(JSON.stringify(value)) ['height'];
          this.pokemon.weight = JSON.parse(JSON.stringify(value)) ['weight'];
        });
        this.userPokeAbilities = this.pokeAPIService.getAbilities();
  }

  getResult() {
    if (this.userPokeAbilities > this.pokemon.abilities) {
        this.pokeAPIService.pokemonsCaptureds[
            this.pokeAPIService.pokemonAtual
        ].results[0] += 1;
    } else if (this.userPokeAbilities == this.pokemon.abilities) {
        this.pokeAPIService.pokemonsCaptureds[
            this.pokeAPIService.pokemonAtual
        ].results[1] += 1;
    } else {
        this.pokeAPIService.pokemonsCaptureds[
            this.pokeAPIService.pokemonAtual
        ].results[2] += 1;
    }
}
}