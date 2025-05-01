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
import { UserTypesGuard } from '@auth/guards/user-type.guard';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { UserTypes } from '@auth/decorators/user-type.decorator';
import { HttpExceptionFilter } from '@filters/http-exception.filter';
import { UserType } from '@enums/enums';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  //only administrator can edit the company
  @UserTypes(UserType.Administrator)
  @UseGuards(JwtAuthGuard, UserTypesGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companyService.update(id, updateCompanyDto);
  }

  //for when you need the data of the company for pdf of sale data
  @Get()
  async findAll() {
    return this.companyService.findAll();
  }
}
