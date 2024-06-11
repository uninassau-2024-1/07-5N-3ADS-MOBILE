import { Component } from '@angular/core';
import { PokeAPIService } from '../services/poke-api.service';
import { ViaCepService } from '../services/via-cep.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  pokemon: any = {
    name: '',
    abilities: 0,
    sprites: {
      front_default: ''
    },
    height: 0,
    weight: 0,
    results: [0, 0, 0],
  }
  areaBuscarPokemon: string = '';
  areaBuscar: any = {
    bairro: '',
    localidade: '',
    logradouro: '',
    uf: ''
  };
  
  constructor(private pokeAPIService: PokeAPIService, private viaCEPService: ViaCepService) {}
  
  
  buscarPokemon() {
    this.viaCEPService.getViaCEPService(this.areaBuscarPokemon)
    .subscribe((value) => {
      this.areaBuscar.logradouro = JSON.parse(JSON.stringify(value)) ['logradouro'];
        this.areaBuscar.bairro = ', ' + JSON.parse(JSON.stringify(value)) ['bairro'];
        this.areaBuscar.localidade = ' - ' + JSON.parse(JSON.stringify(value)) ['localidade'];
        this.areaBuscar.uf = '-' + JSON.parse(JSON.stringify(value)) ['uf'];
      });
      this.pokeAPIService.getPokeAPIService()
      .subscribe((value) => {
        this.pokemon.name = JSON.parse(JSON.stringify(value)) ['name'];
        this.pokemon.sprites.front_default = JSON.parse(JSON.stringify(value)) ['sprites']['front_default'];
        this.pokemon.abilities = JSON.parse(JSON.stringify(value)) ["abilities"].length;
        this.pokemon.height = JSON.parse(JSON.stringify(value)) ['height'];
        this.pokemon.weight = JSON.parse(JSON.stringify(value)) ['weight'];
        this.pokeAPIService.setAbilities(Number(this.pokemon.abilities));
        this.pokeAPIService.pokemonsCaptureds.push(
          structuredClone(this.pokemon)
        );
        this.pokeAPIService.pokemonAtual += 1; 
      });
    }
}
