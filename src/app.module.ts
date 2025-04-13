import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AdministratorModule } from './administrator/administrator.module';
import { CompanyModule } from './company/company.module';
import { CampusModule } from './campus/campus.module';
import { EmployeeModule } from './employee/employee.module';
import { ActivityModule } from './activity/activity.module';
import { CategoryModule } from './category/category.module';
import { RiskModule } from './risk/risk.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { SaleModule } from './sale/sale.module';
import { SaleDetailModule } from './sale-detail/sale-detail.module';
import { DepartmentModule } from './department/department.module';
import { ProvinceModule } from './province/province.module';
import { DistrictModule } from './district/district.module';
import { CityModule } from './city/city.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/wildscape'),
    AuthModule,
    AdministratorModule,
    CompanyModule,
    CampusModule,
    EmployeeModule,
    ActivityModule,
    CategoryModule,
    RiskModule,
    ProductModule,
    UserModule,
    SaleModule,
    SaleDetailModule,
    DepartmentModule,
    ProvinceModule,
    DistrictModule,
    CityModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
