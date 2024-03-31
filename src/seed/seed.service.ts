import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokeApiAdapter } from './api/pokeApi.adapter';

@Injectable()
export class SeedService {

  constructor(
    private readonly http: PokeApiAdapter
  ){}

  private readonly axios: AxiosInstance = axios;

  async excecuteSeed(){
    const { data  } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/')
      const no = +segments[segments.length - 2]
    })
    return data
  }
}
