import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from '../interfaces/http-adapter.interface';


export class PokeApiAdapter implements HttpAdapter{

    private readonly axios: AxiosInstance = axios;

    async get<T>(url: string): Promise<T>{
        const data = await this.axios.get<T>(url);
        return data.data;
    }
}