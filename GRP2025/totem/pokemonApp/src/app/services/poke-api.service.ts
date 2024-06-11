import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokeAPIService {

  constructor(private httpClient:HttpClient) { }

  pokeAbilities: number = 0;

  pokemonsCaptureds: any = [];
  pokemonAtual: number = -1;

  getPokeAPIService(id: number = Math.floor(Math.random() * 151)) {
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
  }

  setAbilities(valueHabil: number) {
    this.pokeAbilities = valueHabil;
  }

  getAbilities() {
    return this.pokeAbilities;
  }
}
