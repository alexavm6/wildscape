import { Module } from '@nestjs/common';
import { SaleDetailService } from './sale-detail.service';
import { SaleDetailController } from './sale-detail.controller';
import { SaleModule } from '@sale/sale.module';
import { ProductModule } from '@product/product.module';
import { CouponModule } from '@coupon/coupon.module';
import { PromotionProductModule } from '@promotion-product/promotion-product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SaleDetail, SaleDetailSchema } from './schema/sale-detail.schema';

@Module({
  imports: [
    SaleModule,
    ProductModule,
    PromotionProductModule,
    CouponModule,
    MongooseModule.forFeature([
      { name: SaleDetail.name, schema: SaleDetailSchema },
    ]),
  ],
  controllers: [SaleDetailController],
  providers: [SaleDetailService],
  exports: [
    MongooseModule.forFeature([
      { name: SaleDetail.name, schema: SaleDetailSchema },
    ]),
  ],
})
export class SaleDetailModule {}
