import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokeApiAdapter } from './api/pokeApi.adapter';
import { HttpAdapter } from './interfaces/http-adapter.interface';

@Injectable()
export class SeedService {

  
  private readonly http: HttpAdapter = new PokeApiAdapter;

  async excecuteSeed(){
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');

  
    return data
  }
}
