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
import { ParseMongoIdPipe } from '@common/pipes/parse-mongo-id.pipe';
import { Roles } from '@auth/decorators/roles.decorator';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Role } from '@enums/enums';
import { PaginationManagementDto } from '@common/dto/management/pagination-management.dto';

@Controller('risk')
export class RiskController {
  constructor(private readonly riskService: RiskService) {}

  /*
    para: usuarios
  */

  @Get('filter')
  async findAllProductFilter() {
    return this.riskService.findAllProductFilter();
  }

  /*
    para: administrador
  */
  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('management-filter')
  async findAllManagementFilter(@Query('name') name?: string) {
    return this.riskService.findAllManagementFilter(name);
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('management')
  async findAllManagement(
    @Query() paginationManagementDto: PaginationManagementDto,
  ) {
    return this.riskService.findAllManagement(paginationManagementDto);
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('management/:id')
  async findByIdManagement(@Param('id', ParseMongoIdPipe) id: string) {
    return this.riskService.findByIdManagement(id);
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async updateById(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateRiskDto: UpdateRiskDto,
  ) {
    return this.riskService.updateById(id, updateRiskDto);
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createRiskDto: CreateRiskDto) {
    return this.riskService.create(createRiskDto);
  }

  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id', ParseMongoIdPipe) id: string) {
    return this.riskService.delete(id);
  }
}
