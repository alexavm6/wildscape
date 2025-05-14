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
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { PaginationSearchActivityDto } from './dto/pagination-search-activity.dto';
import { PaginationDto } from '@common/dto/pagination.dto';
import { Roles } from '@auth/decorators/roles.decorator';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Role } from '@enums/enums';
import { PaginationManagementSearchActivityDto } from './dto/pagination-management-search-activity.dto';
import { ParseMongoIdPipe } from '@common/pipes/parse-mongo-id.pipe';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  /*
    para: usuarios
    is_available: true
    query: limit(5), offset(0)
  */
  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.activityService.findAll(paginationDto);
  }

  /*
    para: usuarios
    is_available: true
    query: limit(5), offset(0), name
  */
  @Get('search')
  async findAllSearch(
    @Query() paginationSearchActivityDto: PaginationSearchActivityDto,
  ) {
    return this.activityService.findAllSearch(paginationSearchActivityDto);
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
    paginationManagementSearchActivityDto: PaginationManagementSearchActivityDto,
  ) {
    return this.activityService.findAllManagementSearch(
      paginationManagementSearchActivityDto,
    );
  }

  /*
    para: usuarios
    is_available: true
    param: id
  */
  @Get(':id')
  async findById(@Param('id', ParseMongoIdPipe) id: string) {
    return this.activityService.findById(id);
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
    return this.activityService.findByIdManagement(id);
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
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    return this.activityService.updateById(id, updateActivityDto);
  }

  /*
    para: administrador, employee(manager, product_manager)
    is_available: true y false
    param: id
  */
  @Roles(Role.Administrator, Role.EmployeeManager, Role.EmployeeProductManager)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createActivityDto: CreateActivityDto) {
    return this.activityService.create(createActivityDto);
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
    return this.activityService.delete(id);
  }
}
