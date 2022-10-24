import { 
    Body, 
    Controller, 
    Delete,
    Get, 
    Param,
    Patch, 
    Post,
    Query 
} from '@nestjs/common';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeesService: CoffeesService) {}

    // ERROR [ExceptionsHandler] this.coffeesService.findAll is not a function
    @Get()
    findAll(@Query() paginationQuery: PaginationQueryDto) {  // from Adding Pagination
        console.log('ran findAll');
        return this.coffeesService.findAll(paginationQuery);
    }
    
    @Get(':id')
    findOne(@Param('id') id: number) {
        console.log(typeof id);
        return this.coffeesService.findOne('' + id);
    }

    @Post() 
    create(@Body() createCoffeeDto: CreateCoffeeDto) {
        console.log(createCoffeeDto instanceof CreateCoffeeDto);
        return this.coffeesService.create(createCoffeeDto);
    }
    
    @Patch(':id')
    update(@Param('id') id: string, @Body() UpdateCoffeeDto: UpdateCoffeeDto) {
        return this.coffeesService.update(id, UpdateCoffeeDto);
    }

    @Delete(':id') 
    remove(@Param('id') id: string) { 
        return this.coffeesService.remove(id);
    }
}