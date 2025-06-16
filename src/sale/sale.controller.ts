import {
  Controller,
  Get,
  Req,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Roles } from '@auth/decorators/roles.decorator';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Role } from '@enums/enums';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';
import { PaginationDto } from '@common/dto/pagination.dto';

@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  /*
    para: usuario logeado
  */
  @Roles(Role.Administrator, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('user')
  async findByUserId(@Req() req: any, @Query() paginationDto: PaginationDto) {
    return this.saleService.findByUserId(req.user, paginationDto);
  }
}
