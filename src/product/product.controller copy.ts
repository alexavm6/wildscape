// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
//   Query,
//   UseGuards,
// } from '@nestjs/common';
// import { ProductService } from './product.service';
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
// import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';
// import { Roles } from '@auth/decorators/roles.decorator';
// import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
// import { RolesGuard } from '@auth/guards/roles.guard';
// import { Role } from '@enums/enums';
// import { PaginationDto } from '@common/dto/pagination.dto';

// @Controller('product')
// export class ProductController {
//   constructor(private readonly productService: ProductService) {}

//   /*
//       para: usuarios
//       is_available: true
//       query: limit(5), offset(0)
//     */
//   @Get()
//   async findAll(@Query() paginationDto: PaginationDto) {
//     return this.productService.findAll(paginationDto);
//   }

//   /*
//     para: usuarios
//     is_available: true
//     query: limit(5), offset(0), simple(false|true), demas parametros del esquema
//   */
//   @Get('search')
//   async findAllSearch(
//     @Query() paginationSimpleSearchProductDto: PaginationSimpleSearchProductDto,
//   ) {
//     return this.productService.findAllSearch(paginationSimpleSearchProductDto);
//   }

//   /*
//     para: administrador, employee(manager, product_manager)
//     is_available: true y false
//     query: limit(5), offset(0), demas parametros del esquema
//   */
//   @Roles(Role.Administrator, Role.EmployeeManager, Role.EmployeeProductManager)
//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Get('management')
//   async findAllManagementSearch(
//     @Query()
//     paginationManagementSearchProductDto: PaginationManagementSearchProductDto,
//   ) {
//     return this.productService.findAllManagementSearch(
//       paginationManagementSearchProductDto,
//     );
//   }

//   /*
//     para: usuarios
//     is_available: true
//     param: id
//   */
//   @Get(':id')
//   async findById(@Param('id', ParseMongoIdPipe) id: string) {
//     return this.productService.findById(id);
//   }

//   /*
//     para: administrador, employee(manager, product_manager)
//     is_available: true y false
//     param: id
//   */
//   @Roles(Role.Administrator, Role.EmployeeManager, Role.EmployeeProductManager)
//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Get('management/:id')
//   async findByIdManagement(@Param('id', ParseMongoIdPipe) id: string) {
//     return this.productService.findByIdManagement(id);
//   }

//   /*
//     para: administrador, employee(manager, product_manager)
//     is_available: true y false
//     param: id
//   */
//   @Roles(Role.Administrator, Role.EmployeeManager, Role.EmployeeProductManager)
//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Patch(':id')
//   async updateById(
//     @Param('id', ParseMongoIdPipe) id: string,
//     @Body() updateProductDto: UpdateProductDto,
//   ) {
//     return this.productService.updateById(id, updateProductDto);
//   }

//   /*
//       para: administrador, employee(manager, product_manager)
//       is_available: true y false
//       param: id
//     */
//   @Roles(Role.Administrator, Role.EmployeeManager, Role.EmployeeProductManager)
//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Post()
//   async create(@Body() createProductDto: CreateProductDto) {
//     return this.productService.create(createProductDto);
//   }

//   /*
//     para: administrador, employee(manager, product_manager)
//     is_available: true y false
//     param: id
//   */
//   @Roles(Role.Administrator, Role.EmployeeManager, Role.EmployeeProductManager)
//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Delete(':id')
//   async delete(@Param('id', ParseMongoIdPipe) id: string) {
//     return this.productService.delete(id);
//   }
// }
