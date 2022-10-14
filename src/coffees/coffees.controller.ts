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
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeesService: CoffeesService) {}

    @Get()
    findAll(@Query() paginationQuery) {
        return this.coffeesService.findAll();
    }
    
    @Get(':id')
    findOne(@Param('id') id: string) {
        console.log(typeof id);
        return this.coffeesService.findOne('' + id);
    }

    @Post() 
    create(@Body() createCoffeeDto: CreateCoffeeDto) {
        console.log(createCoffeeDto instanceof CreateCoffeeDto);
        return this.coffeesService.create(CreateCoffeeDto);
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