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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';
import { Roles } from '@auth/decorators/roles.decorator';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Role } from '@enums/enums';
import { PaginationDto } from '@common/dto/pagination.dto';
import { PaginationSearchCategoryDto } from './dto/pagination-search-category.dto';
import { PaginationManagementSearchCategoryDto } from './dto/pagination-management-search-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  /*
    para: usuarios
    is_available: true
    query: limit(5), offset(0)
  */
  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.categoryService.findAll(paginationDto);
  }

  /*
    para: usuarios
    is_available: true
    query: limit(5), offset(0), name
  */
  @Get('search')
  async findAllSearch(
    @Query() paginationSearchCategoryDto: PaginationSearchCategoryDto,
  ) {
    return this.categoryService.findAllSearch(paginationSearchCategoryDto);
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
    paginationManagementSearchCategoryDto: PaginationManagementSearchCategoryDto,
  ) {
    return this.categoryService.findAllManagementSearch(
      paginationManagementSearchCategoryDto,
    );
  }

  /*
    para: usuarios
    is_available: true
    param: id
  */
  @Get(':id')
  async findById(@Param('id', ParseMongoIdPipe) id: string) {
    return this.categoryService.findById(id);
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
    return this.categoryService.findByIdManagement(id);
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
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateById(id, updateCategoryDto);
  }

  /*
    para: administrador, employee(manager, product_manager)
    is_available: true y false
    param: id
  */
  @Roles(Role.Administrator, Role.EmployeeManager, Role.EmployeeProductManager)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
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
    return this.categoryService.delete(id);
  }
}
