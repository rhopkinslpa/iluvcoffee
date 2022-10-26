import { 
    Body, 
    Controller, 
    Delete,
    Get, 
    Param,
    ParseIntPipe,
    Patch, 
    Post,
    Query 
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiForbiddenResponse, ApiResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { publicDecrypt } from 'crypto';

// workaround: relative vs. shortest in VS Code File - Settings - Typescript - Preferences -
// Import Module Specifier. Changing from shortest to relative doesn't work for me
// import { Protocol } from 'src/common/decorators/protocol.decorator';

import { Protocol } from '../common/decorators/protocol.decorator';
import { Public } from '../common/decorators/public.decorator';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeesService: CoffeesService) {}

    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @Public()
    @Get()
    // from Adding Pagination and Create Custom Param Decorators
    async findAll(
        @Protocol('https') protocol:string, 
        @Query() paginationQuery: PaginationQueryDto
    ) {  
        console.log(protocol);
        return this.coffeesService.findAll(paginationQuery);
    }
    
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        console.log(id);
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