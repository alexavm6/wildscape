import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Sale, SaleSchema } from './schema/sale.schema';
import { SaleDetailModule } from '@sale-detail/sale-detail.module';

@Module({
  imports: [
    SaleDetailModule,
    MongooseModule.forFeature([{ name: Sale.name, schema: SaleSchema }]),
  ],
  controllers: [SaleController],
  providers: [SaleService],
  exports: [
    MongooseModule.forFeature([{ name: Sale.name, schema: SaleSchema }]),
  ],
})
export class SaleModule {}
