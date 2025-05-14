import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { HttpExceptionFilter } from '@filters/http-exception.filter';
import { ParseMongoIdPipe } from '@common/pipes/parse-mongo-id.pipe';
import { Roles } from '@auth/decorators/roles.decorator';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Role } from '@enums/enums';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  /*
    para: administrador
    param: id
  */
  @Roles(Role.Administrator)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async updateById(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.updateById(id, updateCompanyDto);
  }

  /*
    para: usuarios
  */
  @Get()
  async findAll() {
    return this.companyService.findAll();
  }
}
