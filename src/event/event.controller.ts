import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ParseMongoIdPipe } from '@common/pipes/parse-mongo-id.pipe';
import { PaginationDto } from '@common/dto/pagination.dto';
import { Roles } from '@auth/decorators/roles.decorator';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Role } from '@enums/enums';
import { PaginationSimpleSearchEventDto } from './dto/pagination-simple-search-event.dto';
import { PaginationManagementSearchEventDto } from './dto/pagination-management-search-event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  /*
    para: usuarios
    is_available: true
    query: limit(5), offset(0)
    return: name, description, price, id
  */
  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.eventService.findAll(paginationDto);
  }

  /*
    para: usuarios
    is_available: true
    query: limit(5), offset(0), simple(false|true), demas parametros del esquema
  */
  @Get('search')
  async findAllSearch(
    @Query() paginationSimpleSearchEventDto: PaginationSimpleSearchEventDto,
  ) {
    return this.eventService.findAllSearch(paginationSimpleSearchEventDto);
  }

  /*
    para: administrador, employee(manager, product_manager)
    is_available: true y false
    query: limit(5), offset(0), demas parametros del esquema
  */
  @Roles(Role.Administrator, Role.EmployeeManager, Role.EmployeeProductManager)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('management')
  async findAllManagementSearch(
    @Query()
    paginationManagementSearchEventDto: PaginationManagementSearchEventDto,
  ) {
    return this.eventService.findAllManagementSearch(
      paginationManagementSearchEventDto,
    );
  }

  /*
    para: usuarios
    is_available: true
    param: id
  */
  @Get(':id')
  async findById(@Param('id', ParseMongoIdPipe) id: string) {
    return this.eventService.findById(id);
  }

  /*
    para: administrador, employee(manager, product_manager)
    is_available: true y false
    param: id
  */
  @Roles(Role.Administrator, Role.EmployeeManager, Role.EmployeeProductManager)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('management/:id')
  async findByIdManagement(@Param('id', ParseMongoIdPipe) id: string) {
    return this.eventService.findByIdManagement(id);
  }

  /*
    para: administrador, employee(manager, product_manager)
    is_available: true y false
    param: id
  */
  @Roles(Role.Administrator, Role.EmployeeManager, Role.EmployeeProductManager)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async updateById(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventService.updateById(id, updateEventDto);
  }

  /*
    para: administrador, employee(manager, product_manager)
    is_available: true y false
    param: id
  */
  @Roles(Role.Administrator, Role.EmployeeManager, Role.EmployeeProductManager)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  /*
    para: administrador, employee(manager, product_manager)
    is_available: true y false
    param: id
  */
  @Roles(Role.Administrator, Role.EmployeeManager, Role.EmployeeProductManager)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id', ParseMongoIdPipe) id: string) {
    return this.eventService.delete(id);
  }
}
