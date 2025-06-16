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
import { CampusService } from './campus.service';
import { PaginationDto } from '@common/dto/pagination.dto';
import { Roles } from '@auth/decorators/roles.decorator';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Role } from '@enums/enums';
import { PaginationManagementCampusDto } from './dto/pagination-management-campus.dto';
import { ParseMongoIdPipe } from '@common/pipes/parse-mongo-id.pipe';
import { CreateCampusDto } from './dto/create-campus.dto';
import { UpdateCampusDto } from './dto/update-campus.dto';

@Controller('campus')
export class CampusController {
  constructor(private readonly campusService: CampusService) {}

  /*
    para: administrador
  */
  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('management-filter')
  async findAllManagementFilter(@Query('name') name?: string) {
    return this.campusService.findAllManagementFilter(name);
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('management')
  async findAllManagement(
    @Query() paginationManagementCampusDto: PaginationManagementCampusDto,
  ) {
    return this.campusService.findAllManagement(paginationManagementCampusDto);
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('management/:id')
  async findByIdManagement(@Param('id', ParseMongoIdPipe) id: string) {
    return this.campusService.findByIdManagement(id);
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async updateById(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateCampusDto: UpdateCampusDto,
  ) {
    return this.campusService.updateById(id, updateCampusDto);
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createCampusDto: CreateCampusDto) {
    return this.campusService.create(createCampusDto);
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id', ParseMongoIdPipe) id: string) {
    return this.campusService.delete(id);
  }
}
