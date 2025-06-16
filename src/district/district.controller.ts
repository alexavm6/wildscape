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
import { PaginationDto } from '@common/dto/pagination.dto';
import { PaginationManagementDto } from '@common/dto/management/pagination-management.dto';
import { Roles } from '@auth/decorators/roles.decorator';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Role } from '@enums/enums';
import { ParseMongoIdPipe } from '@common/pipes/parse-mongo-id.pipe';
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';

@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  /*
    para: usuarios
  */

  @Get('filter')
  async findAllProductFilter() {
    return this.districtService.findAllProductFilter();
  }

  /*
    para: administrador
  */
  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('management-filter')
  async findAllManagementFilter(@Query('name') name?: string) {
    return this.districtService.findAllManagementFilter(name);
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('management')
  async findAllManagement(
    @Query() paginationManagementDto: PaginationManagementDto,
  ) {
    return this.districtService.findAllManagement(paginationManagementDto);
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('management/:id')
  async findByIdManagement(@Param('id', ParseMongoIdPipe) id: string) {
    return this.districtService.findByIdManagement(id);
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async updateById(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateDistrictDto: UpdateDistrictDto,
  ) {
    return this.districtService.updateById(id, updateDistrictDto);
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createDistrictDto: CreateDistrictDto) {
    return this.districtService.create(createDistrictDto);
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id', ParseMongoIdPipe) id: string) {
    return this.districtService.delete(id);
  }
}
