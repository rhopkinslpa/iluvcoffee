import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { DataSource } from 'typeorm/data-source/DataSource';
import { Event } from '../events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

// See Understand Dependency Injection, 3:00
// See Control NestJS Module Encapsulation, 2:30 and:
//   Value Based Providers
//   Use Transactions   
//   Class Providers 
//   Factory Providers
//   Leverage Async Providers (the last 3 chapters overwrote stuff in this module)
//   Scheme Validation
//   Using the Config Service

// I removed most or all of the above complexity, not necessary. 

@Module({ 
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController], 
  providers: [CoffeesService],
  exports: [CoffeesService],
})
export class  CoffeesModule {}
