import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';
import { Roles } from '@auth/decorators/roles.decorator';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Role } from '@enums/enums';
import { PaginationDto } from '@common/dto/pagination.dto';
import { PaginationSearchProductDto } from './dto/pagination-search-product.dto';
import { PaginationManagementProductDto } from './dto/pagination-management-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /*
    para: usuarios
  */
  /*1*/
  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.productService.findAll(paginationDto);
  }

  /*4*/
  @Get('filter')
  async findAllFilter(@Query('name') name?: string) {
    return this.productService.findAllFilter(name);
  }

  /*5*/
  @Get('search')
  async findAllSearch(
    @Query() paginationSearchProductDto: PaginationSearchProductDto,
  ) {
    return this.productService.findAllSearch(paginationSearchProductDto);
  }

  /*
    para: usuario logeado
  */
  @Roles(Role.Administrator, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('user')
  async findByUserId(@Req() req: any, @Query() paginationDto: PaginationDto) {
    return this.productService.findByUserId(req.user, paginationDto);
  }

  /*
    para: administrador
  */
  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('management-filter')
  async findAllManagementFilter(@Query('name') name?: string) {
    return this.productService.findAllManagementFilter(name);
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('management')
  async findAllManagement(
    @Query() paginationManagementProductDto: PaginationManagementProductDto,
  ) {
    return this.productService.findAllManagement(
      paginationManagementProductDto,
    );
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('management/:id')
  async findByIdManagement(@Param('id', ParseMongoIdPipe) id: string) {
    return this.productService.findByIdManagement(id);
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async updateById(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateById(id, updateProductDto);
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id', ParseMongoIdPipe) id: string) {
    return this.productService.delete(id);
  }

  /*
    para: usuarios
  */
  /*3*/
  @Get(':id')
  async findById(@Param('id', ParseMongoIdPipe) id: string) {
    return this.productService.findById(id);
  }
}
