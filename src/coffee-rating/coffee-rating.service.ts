import { Injectable } from '@nestjs/common';

// shortest vs. relative reference issue
// import { CoffeesService } from 'src/coffees/coffees.service';
import { CoffeesService } from '../coffees/coffees.service';

@Injectable()
export class CoffeeRatingService {
  constructor(private readonly coffeesService: CoffeesService) {}
}
