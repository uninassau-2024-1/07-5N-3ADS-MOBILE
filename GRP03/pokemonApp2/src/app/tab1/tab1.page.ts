import { Component } from '@angular/core';
import { PokeAPIService } from './../services/poke-api.service';
import { ViaCEPService } from './../services/via-cep.service';
import { DataSharingService } from './../services/data-sharing.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  areaBuscarPokemon: string = ''
  areaBusca: any = {
    bairro: '',
    localidade: '',
    logradouro: '',
    uf: '',
  };
  pokemon: any;

  constructor(
    private pokeAPIService: PokeAPIService,
    private viaCEPService: ViaCEPService,
    private dataSharingService: DataSharingService
  ) {}

  buscarPokemon() {
    this.viaCEPService.getViaCEPService(this.areaBuscarPokemon).subscribe((value) => {
      this.areaBusca.logradouro = JSON.parse(JSON.stringify(value))['logradouro'];
      this.areaBusca.bairro = ', ' + JSON.parse(JSON.stringify(value))['bairro'];
      this.areaBusca.localidade = ', ' + JSON.parse(JSON.stringify(value))['localidade'];
      this.areaBusca.uf = ', ' + JSON.parse(JSON.stringify(value))['uf'];

      this.pokeAPIService.getRandomPokemon().subscribe(data => {
        this.pokemon = data;
        // Adicionar a origem do Pokémon como 'tab1'
        this.dataSharingService.setPokemon({ ...this.pokemon, source: 'tab1' });
      });
    });
  }
}
