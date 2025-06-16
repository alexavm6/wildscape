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
import { PaginationDto } from '@common/dto/pagination.dto';
import { Roles } from '@auth/decorators/roles.decorator';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Role } from '@enums/enums';
import { PaginationManagementDto } from '@common/dto/management/pagination-management.dto';
import { ParseMongoIdPipe } from '@common/pipes/parse-mongo-id.pipe';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  /*
    para: usuarios
  */
  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.activityService.findAll(paginationDto);
  }

  @Get('filter')
  async findAllProductFilter() {
    return this.activityService.findAllProductFilter();
  }

  /*
    para: administrador
  */
  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('management-filter')
  async findAllManagementFilter(@Query('name') name?: string) {
    return this.activityService.findAllManagementFilter(name);
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('management')
  async findAllManagement(
    @Query() paginationManagementDto: PaginationManagementDto,
  ) {
    return this.activityService.findAllManagement(paginationManagementDto);
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('management/:id')
  async findByIdManagement(@Param('id', ParseMongoIdPipe) id: string) {
    return this.activityService.findByIdManagement(id);
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async updateById(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    return this.activityService.updateById(id, updateActivityDto);
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createActivityDto: CreateActivityDto) {
    return this.activityService.create(createActivityDto);
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id', ParseMongoIdPipe) id: string) {
    return this.activityService.delete(id);
  }

  /*
    para: usuarios
  */
  @Get(':id')
  async findById(@Param('id', ParseMongoIdPipe) id: string) {
    return this.activityService.findById(id);
  }
}
