import { Injectable } from '@nestjs/common';
import { CreatePromotionProductDto } from './dto/create-promotion-product.dto';
import { UpdatePromotionProductDto } from './dto/update-promotion-product.dto';

@Injectable()
export class PromotionProductService {
  create(createPromotionProductDto: CreatePromotionProductDto) {
    return 'This action adds a new promotionProduct';
  }

  findAll() {
    return `This action returns all promotionProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} promotionProduct`;
  }

  update(id: number, updatePromotionProductDto: UpdatePromotionProductDto) {
    return `This action updates a #${id} promotionProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} promotionProduct`;
  }
}
