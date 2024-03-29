import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { Model, isValidObjectId } from 'mongoose';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name) private pokemonModel = Model<Pokemon>
  ){}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try{
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    }catch(err){
      this.handleExceptions(err);
    }
  }

  findAll() {
    return this.pokemonModel.find();
  }

  async findOne(term: string): Promise<Pokemon>{
    let pokemon: Pokemon;

    if(!isNaN(+term)){
      pokemon = await this.pokemonModel.findOne({ no: term })
    }
    if(!pokemon && isValidObjectId(term)){
      pokemon = await this.pokemonModel.findById( term )
    }
    if(!pokemon){
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase().trim() })
    }
    if(!pokemon) throw new NotFoundException(`Pokemon ${term} not found`)

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne( term );

    if(updatePokemonDto.name) 
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase().trim();

    try{
      const updatedPokemon = await pokemon.updateOne( updatePokemonDto, { new: true } )
    }catch(err){
      this.handleExceptions(err);
    }
    


    return {...pokemon.toJSON(), ...updatePokemonDto};
  }

  async remove(term: string) {
    const pokemon = await this.findOne(term);
    if(!pokemon) throw new NotFoundException(`Pokemon not found`)
    const deletedPokemon = await pokemon.deleteOne();
  }

  async removeById(id: string){
    await this.pokemonModel.findByIdAndDelete( id );
  }

  handleExceptions(err: any){
    if(err.code === 11000) throw new BadRequestException(`Pokemon exist in db ${JSON.stringify(err.keyValue)}`)
    
    throw new InternalServerErrorException(`Can't create Pokemon - Check Server Logs`)
  }
}
