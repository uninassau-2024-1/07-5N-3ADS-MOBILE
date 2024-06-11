import { Component } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { PokeAPIService } from '../services/poke-api.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  pokemonAdv: any = {
    id: '',
    nome: '',
    habilidades: '',
    peso: '',
    altura: '',
    img: ''
  }
  userPokemonAbilities: Number = 0

  result: any = {
    name: ''
  }
  constructor(
    public photoService: PhotoService,
    private pokeAPIService: PokeAPIService,
    public navCtrl: NavController
    ) {  }

  ionViewDidEnter(){
    this.getPokemonAdv()
    setTimeout(()=>this.getResult(), 5000)
  }

  AddPhotoToGallery() {
    this.photoService.addNewToGallery();
  }
  getPokemonAdv(){
    this.pokeAPIService.getPokeAPIService()
      .subscribe((value) => {
        this.pokemonAdv.nome = JSON.parse(JSON.stringify(value))['name']
        this.pokemonAdv.habilidades = JSON.parse(JSON.stringify(value))['abilities'].length
        this.pokemonAdv.peso = JSON.parse(JSON.stringify(value))['weight']
        this.pokemonAdv.altura = JSON.parse(JSON.stringify(value))['height']
        this.pokemonAdv.img = JSON.parse(JSON.stringify(value))['sprites']['other']['dream_world']['front_default']
      })
      this.userPokemonAbilities = this.pokeAPIService.getAbilities()

  }

  getResult(){
    if(this.userPokemonAbilities>this.pokemonAdv.habilidades){
      this.pokeAPIService.pokemonsCaptureds[this.pokeAPIService.pokemonAtual].results[0] += 1
    }
    else if(this.userPokemonAbilities==this.pokemonAdv.habilidades){
      this.pokeAPIService.pokemonsCaptureds[this.pokeAPIService.pokemonAtual].results[1] += 1
    }
    else {
      this.pokeAPIService.pokemonsCaptureds[this.pokeAPIService.pokemonAtual].results[2] += 1 
    }
  }

}
