import { Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, DataSource } from 'typeorm';
import { Event } from '../events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

// See Understand Dependency Injection, 3:00
// See Control NestJS Module Encapsulation, 2:30
// See Value Based Providers
// See Use Transactions   
// See Class Providers 
// See Factory Providers
// See Leverage Async Providers (the last 3 chapters overwrote stuff in this module)

@Module({ 
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController], 
  providers: [ 
    CoffeesService,
    { 
      provide: COFFEE_BRANDS, 
      useFactory: async (connection: DataSource): Promise<string[]> => {
        const coffeeBrands = await Promise.resolve([ 'buddy brew', 'nescafe' ]);
        console.log(' [!] Async factory');
        return coffeeBrands;
      },
      inject: [DataSource],
    },
  ],
  exports: [CoffeesService],
})
export class  CoffeesModule {}
