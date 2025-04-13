import { Module } from '@nestjs/common';
import { SaleDetailService } from './sale-detail.service';
import { SaleDetailController } from './sale-detail.controller';
import { SaleModule } from 'src/sale/sale.module';
import { ProductModule } from 'src/product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SaleDetail, SaleDetailSchema } from './schema/sale-detail.schema';

@Module({
  imports: [
    SaleModule,
    ProductModule,
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
