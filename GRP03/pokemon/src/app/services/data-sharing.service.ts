import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private pokemonSubject = new BehaviorSubject<any>(null);
  pokemon$ = this.pokemonSubject.asObservable();

  private statisticsSubject = new BehaviorSubject<{ vitorias: number; derrotas: number; empates: number }>({
    vitorias: 0,
    derrotas: 0,
    empates: 0
  });
  statistics$ = this.statisticsSubject.asObservable();

  setPokemon(pokemon: any) {
    this.pokemonSubject.next({ ...pokemon, source: 'tab1' });
  }

  getPokemon() {
    return this.pokemonSubject.value;
  }

  updateStatistics(result: 'Ganhou' | 'Perdeu' | 'Empate') {
    let stats = this.statisticsSubject.value;

    if (result === 'Ganhou') {
      stats.vitorias++;
    } else if (result === 'Perdeu') {
      stats.derrotas++;
    } else if (result === 'Empate') {
      stats.empates++;
    }

    this.statisticsSubject.next({ ...stats });
  }
}
