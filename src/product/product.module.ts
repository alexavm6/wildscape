import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CampusModule } from 'src/campus/campus.module';
import { DepartmentModule } from 'src/department/department.module';
import { ProvinceModule } from 'src/province/province.module';
import { DistrictModule } from 'src/district/district.module';
import { CityModule } from 'src/city/city.module';
import { ActivityModule } from 'src/activity/activity.module';
import { CategoryModule } from 'src/category/category.module';
import { RiskModule } from 'src/risk/risk.module';
import { Product, ProductSchema } from './schema/product.schema';

@Module({
  imports: [
    CampusModule,
    DepartmentModule,
    ProvinceModule,
    DistrictModule,
    CityModule,
    ActivityModule,
    CategoryModule,
    RiskModule,
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
})
export class ProductModule {}
