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
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { PaginationDto } from '@common/dto/pagination.dto';
import { PaginationSearchCityDto } from './dto/pagination-search-city.dto';
import { PaginationManagementSearchCityDto } from './dto/pagination-management-search-city.dto';
import { Roles } from '@auth/decorators/roles.decorator';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Role } from '@enums/enums';
import { ParseMongoIdPipe } from '@common/pipes/parse-mongo-id.pipe';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  /*
    para: usuarios
    is_available: true
    query: limit(5), offset(0)
  */
  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.cityService.findAll(paginationDto);
  }

  /*
    para: usuarios
    is_available: true
    query: limit(5), offset(0), name
  */
  @Get('search')
  async findAllSearch(
    @Query() paginationSearchCityDto: PaginationSearchCityDto,
  ) {
    return this.cityService.findAllSearch(paginationSearchCityDto);
  }

  /*
    para: administrador, employee(manager, product_manager)
    is_available: true y false
    query: limit(5), offset(0), name
  */
  @Roles(Role.Administrator, Role.EmployeeManager, Role.EmployeeProductManager)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('management')
  async findAllManagementSearch(
    @Query()
    paginationManagementSearchCityDto: PaginationManagementSearchCityDto,
  ) {
    return this.cityService.findAllManagementSearch(
      paginationManagementSearchCityDto,
    );
  }

  /*
    para: usuarios
    is_available: true
    param: id
  */
  @Get(':id')
  async findById(@Param('id', ParseMongoIdPipe) id: string) {
    return this.cityService.findById(id);
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
    return this.cityService.findByIdManagement(id);
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
    @Body() updateCityDto: UpdateCityDto,
  ) {
    return this.cityService.updateById(id, updateCityDto);
  }

  /*
    para: administrador, employee(manager, product_manager)
    is_available: true y false
    param: id
  */
  @Roles(Role.Administrator, Role.EmployeeManager, Role.EmployeeProductManager)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createCityDto: CreateCityDto) {
    return this.cityService.create(createCityDto);
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
    return this.cityService.delete(id);
  }
}
