import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../services/data-sharing.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  pokemons: any[][] = [];
  statistics = { vitorias: 0, derrotas: 0, empates: 0 };

  constructor(private dataSharingService: DataSharingService) {}

  ngOnInit() {
    this.dataSharingService.pokemon$.subscribe(pokemon => {
      if (pokemon && pokemon.source === 'tab1') {
        this.addPokemon(pokemon);
      }
    });

    this.dataSharingService.statistics$.subscribe(stats => {
      this.statistics = stats;
    });
  }

  addPokemon(pokemon: any) {
    if (this.pokemons.length === 0 || this.pokemons[this.pokemons.length - 1].length === 2) {
      this.pokemons.push([]);
    }
    this.pokemons[this.pokemons.length - 1].push(pokemon);
  }
}
