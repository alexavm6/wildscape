import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CampusModule } from '@campus/campus.module';
import { DepartmentModule } from '@department/department.module';
import { ProvinceModule } from '@province/province.module';
import { DistrictModule } from '@district/district.module';
import { CityModule } from '@city/city.module';
import { ActivityModule } from '@activity/activity.module';
import { CategoryModule } from '@category/category.module';
import { RiskModule } from '@risk/risk.module';
import { Product, ProductSchema } from './schema/product.schema';
import { SaleDetailModule } from '@sale-detail/sale-detail.module';
import { SaleModule } from '@sale/sale.module';

@Module({
  imports: [
    SaleModule,
    SaleDetailModule,
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
})
export class ProductModule {}
