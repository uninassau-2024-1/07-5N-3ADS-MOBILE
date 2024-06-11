import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokeAPIService {
  constructor(private httpClient: HttpClient) {}

  getPokeAPIService(id: number = Math.floor(Math.random() * 100)) {
    return this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }

  getRandomPokemon() {
    const randomId = Math.floor(Math.random() * 898) + 1; // 898 é o número máximo de Pokémons na PokeAPI atualmente
    return this.getPokeAPIService(randomId);
  }
}
