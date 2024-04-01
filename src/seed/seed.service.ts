import { Inject, Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { HttpAdapter } from 'src/common/interfaces/http-adapter.interface';

@Injectable()
export class SeedService {

  constructor(
    private readonly pokemonService: PokemonService,
    @Inject(AxiosAdapter)
    private readonly http: HttpAdapter = new AxiosAdapter 
    ){}
  

  async excecuteSeed(){
    const pokeData = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    const response = pokeData.results.map(({name, url}) => {
      const no = +url.split('/')[6]
      return {name, no}
    })

    await this.pokemonService.createList(response)
    return {status: 200, message: 'Seed executed'}
  }
}
