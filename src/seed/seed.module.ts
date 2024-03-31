import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokeApiAdapter } from './api/pokeApi.adapter';

@Module({
  controllers: [SeedController],
  providers: [SeedService, PokeApiAdapter],
})
export class SeedModule {}
