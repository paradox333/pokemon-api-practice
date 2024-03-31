import axios, { AxiosInstance } from "axios";
import { PokeResponse } from "../interfaces/poke-response.interface";
import { Injectable } from "@nestjs/common";
@Injectable()
export class PokeApiAdapter{

    private readonly axios: AxiosInstance = axios;

    async get(url: string){
        await this.axios.get(url);
        return;
    }
}