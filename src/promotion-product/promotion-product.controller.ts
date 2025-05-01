import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PromotionProductService } from './promotion-product.service';
import { CreatePromotionProductDto } from './dto/create-promotion-product.dto';
import { UpdatePromotionProductDto } from './dto/update-promotion-product.dto';

@Controller('promotion-product')
export class PromotionProductController {
  constructor(private readonly promotionProductService: PromotionProductService) {}

  @Post()
  create(@Body() createPromotionProductDto: CreatePromotionProductDto) {
    return this.promotionProductService.create(createPromotionProductDto);
  }

  @Get()
  findAll() {
    return this.promotionProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.promotionProductService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePromotionProductDto: UpdatePromotionProductDto) {
    return this.promotionProductService.update(+id, updatePromotionProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promotionProductService.remove(+id);
  }
}
