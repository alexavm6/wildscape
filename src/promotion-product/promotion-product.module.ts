import { Module } from '@nestjs/common';
import { PromotionProductService } from './promotion-product.service';
import { PromotionProductController } from './promotion-product.controller';

import { ProductModule } from '@product/product.module';
import { PromotionModule } from '@promotion/promotion.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PromotionProduct,
  PromotionProductSchema,
} from './schema/promotion-product.schema';

@Module({
  imports: [
    ProductModule,
    PromotionModule,
    MongooseModule.forFeature([
      { name: PromotionProduct.name, schema: PromotionProductSchema },
    ]),
  ],
  controllers: [PromotionProductController],
  providers: [PromotionProductService],
  exports: [
    MongooseModule.forFeature([
      { name: PromotionProduct.name, schema: PromotionProductSchema },
    ]),
  ],
})
export class PromotionProductModule {}
