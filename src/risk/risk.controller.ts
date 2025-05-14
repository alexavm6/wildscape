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
import { RiskService } from './risk.service';
import { CreateRiskDto } from './dto/create-risk.dto';
import { UpdateRiskDto } from './dto/update-risk.dto';
import { PaginationDto } from '@common/dto/pagination.dto';
import { PaginationSearchRiskDto } from './dto/pagination-search-risk.dto';
import { PaginationManagementSearchRiskDto } from './dto/pagination-management-search-risk.dto';
import { ParseMongoIdPipe } from '@common/pipes/parse-mongo-id.pipe';
import { Roles } from '@auth/decorators/roles.decorator';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Role } from '@enums/enums';

@Controller('risk')
export class RiskController {
  constructor(private readonly riskService: RiskService) {}

  /*
    para: usuarios
    is_available: true
    query: limit(5), offset(0)
  */
  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.riskService.findAll(paginationDto);
  }

  /*
    para: usuarios
    is_available: true
    query: limit(5), offset(0), name
  */
  @Get('search')
  async findAllSearch(
    @Query() paginationSearchRiskDto: PaginationSearchRiskDto,
  ) {
    return this.riskService.findAllSearch(paginationSearchRiskDto);
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
    paginationManagementSearchRiskDto: PaginationManagementSearchRiskDto,
  ) {
    return this.riskService.findAllManagementSearch(
      paginationManagementSearchRiskDto,
    );
  }

  /*
    para: usuarios
    is_available: true
    param: id
  */
  @Get(':id')
  async findById(@Param('id', ParseMongoIdPipe) id: string) {
    return this.riskService.findById(id);
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
    return this.riskService.findByIdManagement(id);
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
    @Body() updateRiskDto: UpdateRiskDto,
  ) {
    return this.riskService.updateById(id, updateRiskDto);
  }

  /*
    para: administrador, employee(manager, product_manager)
    is_available: true y false
    param: id
  */
  @Roles(Role.Administrator, Role.EmployeeManager, Role.EmployeeProductManager)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createRiskDto: CreateRiskDto) {
    return this.riskService.create(createRiskDto);
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
    return this.riskService.delete(id);
  }
}
