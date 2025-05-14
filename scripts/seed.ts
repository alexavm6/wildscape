// scripts/seed.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Administrator } from '../src/administrator/schema/administrator.schema';
import { Company } from '../src/company/schema/company.schema';
import { Campus } from '../src/campus/schema/campus.schema';
import { Employee } from '../src/employee/schema/employee.schema';
import { Event } from '../src/event/schema/event.schema';
import { Coupon } from '../src/coupon/schema/coupon.schema';
import { Promotion } from '../src/promotion/schema/promotion.schema';
import { Department } from '../src/department/schema/department.schema';
import { Province } from '../src/province/schema/province.schema';
import { District } from '../src/district/schema/district.schema';
import { City } from '../src/city/schema/city.schema';
import { Activity } from '../src/activity/schema/activity.schema';
import { Category } from '../src/category/schema/category.schema';
import { Risk } from '../src/risk/schema/risk.schema';
import { Product } from '../src/product/schema/product.schema';
import { PromotionProduct } from '../src/promotion-product/schema/promotion-product.schema';
import { Sale } from '../src/sale/schema/sale.schema';
import { User } from '../src/user/schema/user.schema';
import { SaleDetail } from '../src/sale-detail/schema/sale-detail.schema';

async function seed() {
  try {
    const app = await NestFactory.createApplicationContext(AppModule);

    const adminModel = app.get<Model<Administrator>>(
      getModelToken(Administrator.name),
    );
    const companyModel = app.get<Model<Company>>(getModelToken(Company.name));
    const campusModel = app.get<Model<Campus>>(getModelToken(Campus.name));
    const employeeModel = app.get<Model<Employee>>(
      getModelToken(Employee.name),
    );

    const departmentModel = app.get<Model<Department>>(
      getModelToken(Department.name),
    );
    const provinceModel = app.get<Model<Province>>(
      getModelToken(Province.name),
    );
    const districtModel = app.get<Model<District>>(
      getModelToken(District.name),
    );
    const cityModel = app.get<Model<City>>(getModelToken(City.name));

    const eventModel = app.get<Model<Event>>(getModelToken(Event.name));
    const couponModel = app.get<Model<Coupon>>(getModelToken(Coupon.name));
    const promotionModel = app.get<Model<Promotion>>(
      getModelToken(Promotion.name),
    );

    const activityModel = app.get<Model<Activity>>(
      getModelToken(Activity.name),
    );
    const categoryModel = app.get<Model<Category>>(
      getModelToken(Category.name),
    );
    const riskModel = app.get<Model<Risk>>(getModelToken(Risk.name));
    const productModel = app.get<Model<Product>>(getModelToken(Product.name));
    const promProductModel = app.get<Model<PromotionProduct>>(
      getModelToken(PromotionProduct.name),
    );

    const userModel = app.get<Model<User>>(getModelToken(User.name));
    const saleModel = app.get<Model<Sale>>(getModelToken(Sale.name));
    const saleDetailModel = app.get<Model<SaleDetail>>(
      getModelToken(SaleDetail.name),
    );

    // Limpiar datos existentes
    await saleDetailModel.deleteMany({});
    await saleModel.deleteMany({});
    await userModel.deleteMany({});
    await promProductModel.deleteMany({});
    await productModel.deleteMany({});
    await riskModel.deleteMany({});
    await categoryModel.deleteMany({});
    await activityModel.deleteMany({});
    await promotionModel.deleteMany({});
    await couponModel.deleteMany({});
    await eventModel.deleteMany({});
    await cityModel.deleteMany({});
    await districtModel.deleteMany({});
    await provinceModel.deleteMany({});
    await departmentModel.deleteMany({});
    await employeeModel.deleteMany({});
    await campusModel.deleteMany({});
    await companyModel.deleteMany({});
    await adminModel.deleteMany({});

    //admin
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123', salt);

    const admin1 = await adminModel.create({
      names: 'Administrator 1',
      last_names: 'Administrator Last Name 1',
      dni: '12345678',
      email: 'administrator1@hotmail.com',
      password: hashedPassword,
      telephone: '123456789',
      is_available: true,
    });

    //company
    const company1 = await companyModel.create({
      name: 'WildScape',
      ruc: '10456789231',
    });

    //campus
    const campus1 = await campusModel.create({
      name: 'Campus 1',
      address: 'Address 1',
      annex: 1,
      company_id: company1._id,
      is_available: true,
    });

    //employee
    const employee1 = await employeeModel.create({
      names: 'Employee 1',
      last_names: 'Employee Last Name 1',
      dni: '72947365',
      email: 'employee1@hotmail.com',
      password: hashedPassword,
      telephone: '734769264',
      campus_id: campus1._id,
      role: 'employee_manager_role',
      is_available: true,
    });

    const employee2 = await employeeModel.create({
      names: 'Employee 2',
      last_names: 'Employee Last Name 2',
      dni: '92734529',
      email: 'employee2@hotmail.com',
      password: hashedPassword,
      telephone: '194736271',
      campus_id: campus1._id,
      role: 'employee_guide_role',
      is_available: true,
    });

    const employee3 = await employeeModel.create({
      names: 'Employee 3',
      last_names: 'Employee Last Name 3',
      dni: '27495621',
      email: 'employee3@hotmail.com',
      password: hashedPassword,
      telephone: '748294382',
      campus_id: campus1._id,
      role: 'employee_product_manager_role',
      is_available: true,
    });

    //event
    const department1 = await departmentModel.create({
      name: 'Lima',
      is_available: true,
    });

    const province1 = await provinceModel.create({
      name: 'Lima',
      is_available: true,
    });

    const district1 = await districtModel.create({
      name: 'San Martin de Porres',
      is_available: true,
    });

    const city1 = await cityModel.create({
      name: 'Lima',
      is_available: true,
    });

    const event1 = await eventModel.create({
      name: 'Event 1',
      description: 'Event Description 1 True',
      campus_id: campus1._id,
      price: 10,
      event_day: new Date('2025-05-10T09:00:00-05:00'),
      event_time: new Date('2025-05-10T09:00:00-05:00'),
      capacity: 100,
      department_id: department1._id,
      province_id: province1._id,
      district_id: district1._id,
      city_id: city1._id,
      address: 'A la altura de la farmacia, 140',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const event2 = await eventModel.create({
      name: 'Event 2',
      description: 'Event Description 2 True',
      campus_id: campus1._id,
      price: 10,
      event_day: new Date('2025-05-10T09:00:00-05:00'),
      event_time: new Date('2025-05-10T09:00:00-05:00'),
      capacity: 100,
      department_id: department1._id,
      province_id: province1._id,
      district_id: district1._id,
      city_id: city1._id,
      address: 'A la altura de la farmacia, 140',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const event3 = await eventModel.create({
      name: 'Event 3',
      description: 'Event Description 3 True',
      campus_id: campus1._id,
      price: 10,
      event_day: new Date('2025-05-10T09:00:00-05:00'),
      event_time: new Date('2025-05-10T09:00:00-05:00'),
      capacity: 100,
      department_id: department1._id,
      province_id: province1._id,
      district_id: district1._id,
      city_id: city1._id,
      address: 'A la altura de la farmacia, 140',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const event4 = await eventModel.create({
      name: 'Event 4',
      description: 'Event Description 4 True',
      campus_id: campus1._id,
      price: 10,
      event_day: new Date('2025-05-10T09:00:00-05:00'),
      event_time: new Date('2025-05-10T09:00:00-05:00'),
      capacity: 100,
      department_id: department1._id,
      province_id: province1._id,
      district_id: district1._id,
      city_id: city1._id,
      address: 'A la altura de la farmacia, 140',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const event5 = await eventModel.create({
      name: 'Event 5',
      description: 'Event Description 5 True',
      campus_id: campus1._id,
      price: 10,
      event_day: new Date('2025-05-10T09:00:00-05:00'),
      event_time: new Date('2025-05-10T09:00:00-05:00'),
      capacity: 100,
      department_id: department1._id,
      province_id: province1._id,
      district_id: district1._id,
      city_id: city1._id,
      address: 'A la altura de la farmacia, 140',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const event6 = await eventModel.create({
      name: 'Event 6',
      description: 'Event Description 6 True',
      campus_id: campus1._id,
      price: 10,
      event_day: new Date('2025-05-10T09:00:00-05:00'),
      event_time: new Date('2025-05-10T09:00:00-05:00'),
      capacity: 100,
      department_id: department1._id,
      province_id: province1._id,
      district_id: district1._id,
      city_id: city1._id,
      address: 'A la altura de la farmacia, 140',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const event7 = await eventModel.create({
      name: 'Event 7',
      description: 'Event Description 7 True',
      campus_id: campus1._id,
      price: 10,
      event_day: new Date('2025-05-10T09:00:00-05:00'),
      event_time: new Date('2025-05-10T09:00:00-05:00'),
      capacity: 100,
      department_id: department1._id,
      province_id: province1._id,
      district_id: district1._id,
      city_id: city1._id,
      address: 'A la altura de la farmacia, 140',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const event8 = await eventModel.create({
      name: 'Event 8',
      description: 'Event Description 8 True',
      campus_id: campus1._id,
      price: 10,
      event_day: new Date('2025-05-10T09:00:00-05:00'),
      event_time: new Date('2025-05-10T09:00:00-05:00'),
      capacity: 100,
      department_id: department1._id,
      province_id: province1._id,
      district_id: district1._id,
      city_id: city1._id,
      address: 'A la altura de la farmacia, 140',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const event9 = await eventModel.create({
      name: 'Event 9',
      description: 'Event Description 9 True',
      campus_id: campus1._id,
      price: 10,
      event_day: new Date('2025-05-10T09:00:00-05:00'),
      event_time: new Date('2025-05-10T09:00:00-05:00'),
      capacity: 100,
      department_id: department1._id,
      province_id: province1._id,
      district_id: district1._id,
      city_id: city1._id,
      address: 'A la altura de la farmacia, 140',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const event10 = await eventModel.create({
      name: 'Event 10',
      description: 'Event Description 10 True',
      campus_id: campus1._id,
      price: 10,
      event_day: new Date('2025-05-10T09:00:00-05:00'),
      event_time: new Date('2025-05-10T09:00:00-05:00'),
      capacity: 100,
      department_id: department1._id,
      province_id: province1._id,
      district_id: district1._id,
      city_id: city1._id,
      address: 'A la altura de la farmacia, 140',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const event11 = await eventModel.create({
      name: 'Event 11',
      description: 'Event Description 11 False',
      campus_id: campus1._id,
      price: 10,
      event_day: new Date('2025-05-10T09:00:00-05:00'),
      event_time: new Date('2025-05-10T09:00:00-05:00'),
      capacity: 100,
      department_id: department1._id,
      province_id: province1._id,
      district_id: district1._id,
      city_id: city1._id,
      address: 'A la altura de la farmacia, 140',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const event12 = await eventModel.create({
      name: 'Event 12',
      description: 'Event Description 12 False',
      campus_id: campus1._id,
      price: 10,
      event_day: new Date('2025-05-10T09:00:00-05:00'),
      event_time: new Date('2025-05-10T09:00:00-05:00'),
      capacity: 100,
      department_id: department1._id,
      province_id: province1._id,
      district_id: district1._id,
      city_id: city1._id,
      address: 'A la altura de la farmacia, 140',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const event13 = await eventModel.create({
      name: 'Event 13',
      description: 'Event Description 13 False',
      campus_id: campus1._id,
      price: 10,
      event_day: new Date('2025-05-10T09:00:00-05:00'),
      event_time: new Date('2025-05-10T09:00:00-05:00'),
      capacity: 100,
      department_id: department1._id,
      province_id: province1._id,
      district_id: district1._id,
      city_id: city1._id,
      address: 'A la altura de la farmacia, 140',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const event14 = await eventModel.create({
      name: 'Event 14',
      description: 'Event Description 14 False',
      campus_id: campus1._id,
      price: 10,
      event_day: new Date('2025-05-10T09:00:00-05:00'),
      event_time: new Date('2025-05-10T09:00:00-05:00'),
      capacity: 100,
      department_id: department1._id,
      province_id: province1._id,
      district_id: district1._id,
      city_id: city1._id,
      address: 'A la altura de la farmacia, 140',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const event15 = await eventModel.create({
      name: 'Event 15',
      description: 'Event Description 15 False',
      campus_id: campus1._id,
      price: 10,
      event_day: new Date('2025-05-10T09:00:00-05:00'),
      event_time: new Date('2025-05-10T09:00:00-05:00'),
      capacity: 100,
      department_id: department1._id,
      province_id: province1._id,
      district_id: district1._id,
      city_id: city1._id,
      address: 'A la altura de la farmacia, 140',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const event16 = await eventModel.create({
      name: 'Event 16',
      description: 'Event Description 16 False',
      campus_id: campus1._id,
      price: 10,
      event_day: new Date('2025-05-10T09:00:00-05:00'),
      event_time: new Date('2025-05-10T09:00:00-05:00'),
      capacity: 100,
      department_id: department1._id,
      province_id: province1._id,
      district_id: district1._id,
      city_id: city1._id,
      address: 'A la altura de la farmacia, 140',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const event17 = await eventModel.create({
      name: 'Event 17',
      description: 'Event Description 17 False',
      campus_id: campus1._id,
      price: 10,
      event_day: new Date('2025-05-10T09:00:00-05:00'),
      event_time: new Date('2025-05-10T09:00:00-05:00'),
      capacity: 100,
      department_id: department1._id,
      province_id: province1._id,
      district_id: district1._id,
      city_id: city1._id,
      address: 'A la altura de la farmacia, 140',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const event18 = await eventModel.create({
      name: 'Event 18',
      description: 'Event Description 18 False',
      campus_id: campus1._id,
      price: 10,
      event_day: new Date('2025-05-10T09:00:00-05:00'),
      event_time: new Date('2025-05-10T09:00:00-05:00'),
      capacity: 100,
      department_id: department1._id,
      province_id: province1._id,
      district_id: district1._id,
      city_id: city1._id,
      address: 'A la altura de la farmacia, 140',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const event19 = await eventModel.create({
      name: 'Event 19',
      description: 'Event Description 19 False',
      campus_id: campus1._id,
      price: 10,
      event_day: new Date('2025-05-10T09:00:00-05:00'),
      event_time: new Date('2025-05-10T09:00:00-05:00'),
      capacity: 100,
      department_id: department1._id,
      province_id: province1._id,
      district_id: district1._id,
      city_id: city1._id,
      address: 'A la altura de la farmacia, 140',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const event20 = await eventModel.create({
      name: 'Event 20',
      description: 'Event Description 20 False',
      campus_id: campus1._id,
      price: 10,
      event_day: new Date('2025-05-10T09:00:00-05:00'),
      event_time: new Date('2025-05-10T09:00:00-05:00'),
      capacity: 100,
      department_id: department1._id,
      province_id: province1._id,
      district_id: district1._id,
      city_id: city1._id,
      address: 'A la altura de la farmacia, 140',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const coupon1 = await couponModel.create({
      name: 'CATARA1',
      percentage: 0.8,
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const coupon2 = await couponModel.create({
      name: 'CATARA2',
      percentage: 0.5,
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const coupon3 = await couponModel.create({
      name: 'CATARA3',
      percentage: 0.2,
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const coupon4 = await couponModel.create({
      name: 'CATARA4',
      percentage: 0.2,
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const coupon5 = await couponModel.create({
      name: 'CATARA5',
      percentage: 0.4,
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const coupon6 = await couponModel.create({
      name: 'CATARA6',
      percentage: 0.6,
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const coupon7 = await couponModel.create({
      name: 'CATARA7',
      percentage: 0.6,
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const coupon8 = await couponModel.create({
      name: 'CATARA8',
      percentage: 0.6,
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const coupon9 = await couponModel.create({
      name: 'CATARA9',
      percentage: 0.6,
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const coupon10 = await couponModel.create({
      name: 'CATARA10',
      percentage: 0.6,
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const coupon11 = await couponModel.create({
      name: 'CATARA11',
      percentage: 0.6,
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const coupon12 = await couponModel.create({
      name: 'CATARA12',
      percentage: 0.6,
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const coupon13 = await couponModel.create({
      name: 'CATARA13',
      percentage: 0.6,
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const coupon14 = await couponModel.create({
      name: 'CATARA14',
      percentage: 0.6,
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const coupon15 = await couponModel.create({
      name: 'CATARA15',
      percentage: 0.6,
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const coupon16 = await couponModel.create({
      name: 'CATARA16',
      percentage: 0.6,
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const coupon17 = await couponModel.create({
      name: 'CATARA17',
      percentage: 0.6,
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const coupon18 = await couponModel.create({
      name: 'CATARA18',
      percentage: 0.6,
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const coupon19 = await couponModel.create({
      name: 'CATARA19',
      percentage: 0.6,
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const coupon20 = await couponModel.create({
      name: 'CATARA20',
      percentage: 0.6,
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const promotion1 = await promotionModel.create({
      name: 'CyberWow1',
      description: 'CyberWow Catara Description',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const promotion2 = await promotionModel.create({
      name: 'CyberWow2',
      description: 'CyberWow Catara Description',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const promotion3 = await promotionModel.create({
      name: 'CyberWow3',
      description: 'CyberWow Catara Description',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const promotion4 = await promotionModel.create({
      name: 'CyberWow4',
      description: 'CyberWow Catara Description',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const promotion5 = await promotionModel.create({
      name: 'CyberWow5',
      description: 'CyberWow Catara Description',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const promotion6 = await promotionModel.create({
      name: 'CyberWow6',
      description: 'CyberWow Catara Description',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const promotion7 = await promotionModel.create({
      name: 'CyberWow7',
      description: 'CyberWow Catara Description',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const promotion8 = await promotionModel.create({
      name: 'CyberWow8',
      description: 'CyberWow Catara Description',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const promotion9 = await promotionModel.create({
      name: 'CyberWow9',
      description: 'CyberWow Catara Description',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const promotion10 = await promotionModel.create({
      name: 'CyberWow10',
      description: 'CyberWow Catara Description',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const promotion11 = await promotionModel.create({
      name: 'CyberWow11',
      description: 'CyberWow Catara Description',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const promotion12 = await promotionModel.create({
      name: 'CyberWow12',
      description: 'CyberWow Catara Description',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const promotion13 = await promotionModel.create({
      name: 'CyberWow13',
      description: 'CyberWow Catara Description',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const promotion14 = await promotionModel.create({
      name: 'CyberWow14',
      description: 'CyberWow Catara Description',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const promotion15 = await promotionModel.create({
      name: 'CyberWow15',
      description: 'CyberWow Catara Description',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const promotion16 = await promotionModel.create({
      name: 'CyberWow16',
      description: 'CyberWow Catara Description',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const promotion17 = await promotionModel.create({
      name: 'CyberWow17',
      description: 'CyberWow Catara Description',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const promotion18 = await promotionModel.create({
      name: 'CyberWow18',
      description: 'CyberWow Catara Description',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const promotion19 = await promotionModel.create({
      name: 'CyberWow19',
      description: 'CyberWow Catara Description',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const promotion20 = await promotionModel.create({
      name: 'CyberWow20',
      description: 'CyberWow Catara Description',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const activity1 = await activityModel.create({
      name: 'Paseo',
      image:
        'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/DKFWJNPYQZGU7DEG7LE3A6XS2Y.jpg',
      is_available: true,
    });

    const activity2 = await activityModel.create({
      name: 'Canotaje',
      image:
        'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/DKFWJNPYQZGU7DEG7LE3A6XS2Y.jpg',
      is_available: true,
    });

    const activity3 = await activityModel.create({
      name: 'Parapente',
      image:
        'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/DKFWJNPYQZGU7DEG7LE3A6XS2Y.jpg',
      is_available: true,
    });

    const activity4 = await activityModel.create({
      name: 'Rafting',
      image:
        'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/DKFWJNPYQZGU7DEG7LE3A6XS2Y.jpg',
      is_available: true,
    });

    const activity5 = await activityModel.create({
      name: 'Escalada',
      image:
        'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/DKFWJNPYQZGU7DEG7LE3A6XS2Y.jpg',
      is_available: true,
    });

    const activity6 = await activityModel.create({
      name: 'Surf',
      image:
        'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/DKFWJNPYQZGU7DEG7LE3A6XS2Y.jpg',
      is_available: true,
    });

    const activity7 = await activityModel.create({
      name: 'Paracaidismo',
      image:
        'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/DKFWJNPYQZGU7DEG7LE3A6XS2Y.jpg',
      is_available: true,
    });

    const activity8 = await activityModel.create({
      name: 'Tirolesa',
      image:
        'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/DKFWJNPYQZGU7DEG7LE3A6XS2Y.jpg',
      is_available: true,
    });

    const activity9 = await activityModel.create({
      name: 'Buceo',
      image:
        'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/DKFWJNPYQZGU7DEG7LE3A6XS2Y.jpg',
      is_available: true,
    });

    const activity10 = await activityModel.create({
      name: 'Ciclismo',
      image:
        'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/DKFWJNPYQZGU7DEG7LE3A6XS2Y.jpg',
      is_available: true,
    });

    const activity11 = await activityModel.create({
      name: 'Espeología',
      image:
        'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/DKFWJNPYQZGU7DEG7LE3A6XS2Y.jpg',
      is_available: true,
    });

    const activity12 = await activityModel.create({
      name: 'Windsurf',
      image:
        'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/DKFWJNPYQZGU7DEG7LE3A6XS2Y.jpg',
      is_available: true,
    });

    const activity13 = await activityModel.create({
      name: 'Kitesurf',
      image:
        'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/DKFWJNPYQZGU7DEG7LE3A6XS2Y.jpg',
      is_available: true,
    });

    const activity14 = await activityModel.create({
      name: 'Montañismo',
      image:
        'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/DKFWJNPYQZGU7DEG7LE3A6XS2Y.jpg',
      is_available: true,
    });

    const activity15 = await activityModel.create({
      name: 'Bungee jumping',
      image:
        'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/DKFWJNPYQZGU7DEG7LE3A6XS2Y.jpg',
      is_available: true,
    });

    const activity16 = await activityModel.create({
      name: 'Snorkel',
      image:
        'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/DKFWJNPYQZGU7DEG7LE3A6XS2Y.jpg',
      is_available: true,
    });

    const activity17 = await activityModel.create({
      name: 'Puenting',
      image:
        'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/DKFWJNPYQZGU7DEG7LE3A6XS2Y.jpg',
      is_available: true,
    });

    const activity18 = await activityModel.create({
      name: 'Cabalgata',
      image:
        'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/DKFWJNPYQZGU7DEG7LE3A6XS2Y.jpg',
      is_available: true,
    });

    const activity19 = await activityModel.create({
      name: 'Camping',
      image:
        'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/DKFWJNPYQZGU7DEG7LE3A6XS2Y.jpg',
      is_available: true,
    });

    const activity20 = await activityModel.create({
      name: 'Caminatas urbanas',
      image:
        'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/DKFWJNPYQZGU7DEG7LE3A6XS2Y.jpg',
      is_available: true,
    });

    const category1 = await categoryModel.create({
      name: 'Acuatico',
      image:
        'https://www.webventure.com.br/wp-content/uploads/2017/02/20100129_124125_g.jpg',
      is_available: true,
    });

    const category2 = await categoryModel.create({
      name: 'Aereo',
      image:
        'https://www.webventure.com.br/wp-content/uploads/2017/02/20100129_124125_g.jpg',
      is_available: true,
    });

    const category3 = await categoryModel.create({
      name: 'Terrestre',
      image:
        'https://www.webventure.com.br/wp-content/uploads/2017/02/20100129_124125_g.jpg',
      is_available: true,
    });

    const risk1 = await riskModel.create({
      name: 'Alto',
      is_available: true,
    });

    const risk2 = await riskModel.create({
      name: 'Medio',
      is_available: true,
    });

    const risk3 = await riskModel.create({
      name: 'Bajo',
      is_available: true,
    });

    const product1 = await productModel.create({
      name: 'Disfruta de un lindo paseo',
      activity_id: activity1._id,
      category_id: category3._id,
      risk_id: risk3._id,
      campus_id: campus1._id,
      description: 'Disfruta de esta experiencia de paseo',
      capacity: 10,
      displacement_duration: 60,
      price: 200,
      image: 'imageUrl',
      activity_day: new Date('2025-05-10T09:00:00-05:00'),
      activity_duration: 180,
      activity_department_id: activity1._id,
      activity_province_id: province1._id,
      activity_district_id: district1._id,
      activity_city_id: city1._id,
      activity_address: 'A la altura de la farmacia, 250',
      activity_time: new Date('2025-05-10T09:00:00-05:00'),
      meeting_department_id: activity1._id,
      meeting_province_id: province1._id,
      meeting_district_id: district1._id,
      meeting_city_id: city1._id,
      meeting_address: 'A la altura de la farmacia, 250',
      meeting_time: new Date('2025-05-10T09:00:00-05:00'),
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const product2 = await productModel.create({
      name: 'Disfruta de un lindo canotaje',
      activity_id: activity2._id,
      category_id: category1._id,
      risk_id: risk1._id,
      campus_id: campus1._id,
      description: 'Disfruta de esta experiencia de parapente',
      capacity: 10,
      displacement_duration: 60,
      price: 200,
      image: 'imageUrl',
      activity_day: new Date('2025-05-10T09:00:00-05:00'),
      activity_duration: 180,
      activity_department_id: activity1._id,
      activity_province_id: province1._id,
      activity_district_id: district1._id,
      activity_city_id: city1._id,
      activity_address: 'A la altura de la polleria, 250',
      activity_time: new Date('2025-05-10T09:00:00-05:00'),
      meeting_department_id: activity1._id,
      meeting_province_id: province1._id,
      meeting_district_id: district1._id,
      meeting_city_id: city1._id,
      meeting_address: 'A la altura de la polleria, 250',
      meeting_time: new Date('2025-05-10T09:00:00-05:00'),
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const product3 = await productModel.create({
      name: 'Disfruta de un lindo parapente',
      activity_id: activity3._id,
      category_id: category2._id,
      risk_id: risk1._id,
      campus_id: campus1._id,
      description: 'Disfruta de esta experiencia de parapente',
      capacity: 10,
      displacement_duration: 60,
      price: 200,
      image: 'imageUrl',
      activity_day: new Date('2025-05-10T09:00:00-05:00'),
      activity_duration: 180,
      activity_department_id: activity1._id,
      activity_province_id: province1._id,
      activity_district_id: district1._id,
      activity_city_id: city1._id,
      activity_address: 'A la altura de la polleria, 250',
      activity_time: new Date('2025-05-10T09:00:00-05:00'),
      meeting_department_id: activity1._id,
      meeting_province_id: province1._id,
      meeting_district_id: district1._id,
      meeting_city_id: city1._id,
      meeting_address: 'A la altura de la polleria, 250',
      meeting_time: new Date('2025-05-10T09:00:00-05:00'),
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const product4 = await productModel.create({
      name: 'Disfruta de un lindo rafting',
      activity_id: activity4._id,
      category_id: category1._id,
      risk_id: risk1._id,
      campus_id: campus1._id,
      description: 'Disfruta de esta experiencia de parapente',
      capacity: 10,
      displacement_duration: 60,
      price: 200,
      image: 'imageUrl',
      activity_day: new Date('2025-05-10T09:00:00-05:00'),
      activity_duration: 180,
      activity_department_id: activity1._id,
      activity_province_id: province1._id,
      activity_district_id: district1._id,
      activity_city_id: city1._id,
      activity_address: 'A la altura de la polleria, 250',
      activity_time: new Date('2025-05-10T09:00:00-05:00'),
      meeting_department_id: activity1._id,
      meeting_province_id: province1._id,
      meeting_district_id: district1._id,
      meeting_city_id: city1._id,
      meeting_address: 'A la altura de la polleria, 250',
      meeting_time: new Date('2025-05-10T09:00:00-05:00'),
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const product5 = await productModel.create({
      name: 'Disfruta de una lindo escalada',
      activity_id: activity5._id,
      category_id: category3._id,
      risk_id: risk2._id,
      campus_id: campus1._id,
      description: 'Disfruta de esta experiencia de parapente',
      capacity: 10,
      displacement_duration: 60,
      price: 200,
      image: 'imageUrl',
      activity_day: new Date('2025-05-10T09:00:00-05:00'),
      activity_duration: 180,
      activity_department_id: activity1._id,
      activity_province_id: province1._id,
      activity_district_id: district1._id,
      activity_city_id: city1._id,
      activity_address: 'A la altura de la polleria, 250',
      activity_time: new Date('2025-05-10T09:00:00-05:00'),
      meeting_department_id: activity1._id,
      meeting_province_id: province1._id,
      meeting_district_id: district1._id,
      meeting_city_id: city1._id,
      meeting_address: 'A la altura de la polleria, 250',
      meeting_time: new Date('2025-05-10T09:00:00-05:00'),
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const product6 = await productModel.create({
      name: 'Disfruta del surf',
      activity_id: activity6._id,
      category_id: category1._id,
      risk_id: risk2._id,
      campus_id: campus1._id,
      description: 'Disfruta de esta experiencia de parapente',
      capacity: 10,
      displacement_duration: 60,
      price: 200,
      image: 'imageUrl',
      activity_day: new Date('2025-05-10T09:00:00-05:00'),
      activity_duration: 180,
      activity_department_id: activity1._id,
      activity_province_id: province1._id,
      activity_district_id: district1._id,
      activity_city_id: city1._id,
      activity_address: 'A la altura de la polleria, 250',
      activity_time: new Date('2025-05-10T09:00:00-05:00'),
      meeting_department_id: activity1._id,
      meeting_province_id: province1._id,
      meeting_district_id: district1._id,
      meeting_city_id: city1._id,
      meeting_address: 'A la altura de la polleria, 250',
      meeting_time: new Date('2025-05-10T09:00:00-05:00'),
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const product7 = await productModel.create({
      name: 'Disfruta del paracaidismo',
      activity_id: activity7._id,
      category_id: category2._id,
      risk_id: risk1._id,
      campus_id: campus1._id,
      description: 'Disfruta de esta experiencia de parapente',
      capacity: 10,
      displacement_duration: 60,
      price: 200,
      image: 'imageUrl',
      activity_day: new Date('2025-05-10T09:00:00-05:00'),
      activity_duration: 180,
      activity_department_id: activity1._id,
      activity_province_id: province1._id,
      activity_district_id: district1._id,
      activity_city_id: city1._id,
      activity_address: 'A la altura de la polleria, 250',
      activity_time: new Date('2025-05-10T09:00:00-05:00'),
      meeting_department_id: activity1._id,
      meeting_province_id: province1._id,
      meeting_district_id: district1._id,
      meeting_city_id: city1._id,
      meeting_address: 'A la altura de la polleria, 250',
      meeting_time: new Date('2025-05-10T09:00:00-05:00'),
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const product8 = await productModel.create({
      name: 'Disfruta de la tirolesa',
      activity_id: activity8._id,
      category_id: category2._id,
      risk_id: risk1._id,
      campus_id: campus1._id,
      description: 'Disfruta de esta experiencia de parapente',
      capacity: 10,
      displacement_duration: 60,
      price: 200,
      image: 'imageUrl',
      activity_day: new Date('2025-05-10T09:00:00-05:00'),
      activity_duration: 180,
      activity_department_id: activity1._id,
      activity_province_id: province1._id,
      activity_district_id: district1._id,
      activity_city_id: city1._id,
      activity_address: 'A la altura de la polleria, 250',
      activity_time: new Date('2025-05-10T09:00:00-05:00'),
      meeting_department_id: activity1._id,
      meeting_province_id: province1._id,
      meeting_district_id: district1._id,
      meeting_city_id: city1._id,
      meeting_address: 'A la altura de la polleria, 250',
      meeting_time: new Date('2025-05-10T09:00:00-05:00'),
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const product9 = await productModel.create({
      name: 'Buceo con tortugas',
      activity_id: activity9._id,
      category_id: category1._id,
      risk_id: risk1._id,
      campus_id: campus1._id,
      description: 'Disfruta de esta experiencia de parapente',
      capacity: 10,
      displacement_duration: 60,
      price: 200,
      image: 'imageUrl',
      activity_day: new Date('2025-05-10T09:00:00-05:00'),
      activity_duration: 180,
      activity_department_id: activity1._id,
      activity_province_id: province1._id,
      activity_district_id: district1._id,
      activity_city_id: city1._id,
      activity_address: 'A la altura de la polleria, 250',
      activity_time: new Date('2025-05-10T09:00:00-05:00'),
      meeting_department_id: activity1._id,
      meeting_province_id: province1._id,
      meeting_district_id: district1._id,
      meeting_city_id: city1._id,
      meeting_address: 'A la altura de la polleria, 250',
      meeting_time: new Date('2025-05-10T09:00:00-05:00'),
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const product10 = await productModel.create({
      name: 'Ciclismo por el bosque',
      activity_id: activity10._id,
      category_id: category3._id,
      risk_id: risk3._id,
      campus_id: campus1._id,
      description: 'Disfruta de esta experiencia de parapente',
      capacity: 10,
      displacement_duration: 60,
      price: 200,
      image: 'imageUrl',
      activity_day: new Date('2025-05-10T09:00:00-05:00'),
      activity_duration: 180,
      activity_department_id: activity1._id,
      activity_province_id: province1._id,
      activity_district_id: district1._id,
      activity_city_id: city1._id,
      activity_address: 'A la altura de la polleria, 250',
      activity_time: new Date('2025-05-10T09:00:00-05:00'),
      meeting_department_id: activity1._id,
      meeting_province_id: province1._id,
      meeting_district_id: district1._id,
      meeting_city_id: city1._id,
      meeting_address: 'A la altura de la polleria, 250',
      meeting_time: new Date('2025-05-10T09:00:00-05:00'),
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const product11 = await productModel.create({
      name: 'Espeologia en las cuevas de la sirenita',
      activity_id: activity11._id,
      category_id: category1._id,
      risk_id: risk1._id,
      campus_id: campus1._id,
      description: 'Disfruta de esta experiencia de parapente',
      capacity: 10,
      displacement_duration: 60,
      price: 200,
      image: 'imageUrl',
      activity_day: new Date('2025-05-10T09:00:00-05:00'),
      activity_duration: 180,
      activity_department_id: activity1._id,
      activity_province_id: province1._id,
      activity_district_id: district1._id,
      activity_city_id: city1._id,
      activity_address: 'A la altura de la polleria, 250',
      activity_time: new Date('2025-05-10T09:00:00-05:00'),
      meeting_department_id: activity1._id,
      meeting_province_id: province1._id,
      meeting_district_id: district1._id,
      meeting_city_id: city1._id,
      meeting_address: 'A la altura de la polleria, 250',
      meeting_time: new Date('2025-05-10T09:00:00-05:00'),
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const product12 = await productModel.create({
      name: 'Windsurf extremo',
      activity_id: activity12._id,
      category_id: category1._id,
      risk_id: risk2._id,
      campus_id: campus1._id,
      description: 'Disfruta de esta experiencia de parapente',
      capacity: 10,
      displacement_duration: 60,
      price: 200,
      image: 'imageUrl',
      activity_day: new Date('2025-05-10T09:00:00-05:00'),
      activity_duration: 180,
      activity_department_id: activity1._id,
      activity_province_id: province1._id,
      activity_district_id: district1._id,
      activity_city_id: city1._id,
      activity_address: 'A la altura de la polleria, 250',
      activity_time: new Date('2025-05-10T09:00:00-05:00'),
      meeting_department_id: activity1._id,
      meeting_province_id: province1._id,
      meeting_district_id: district1._id,
      meeting_city_id: city1._id,
      meeting_address: 'A la altura de la polleria, 250',
      meeting_time: new Date('2025-05-10T09:00:00-05:00'),
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const product13 = await productModel.create({
      name: 'Kitesurf extremo',
      activity_id: activity13._id,
      category_id: category1._id,
      risk_id: risk2._id,
      campus_id: campus1._id,
      description: 'Disfruta de esta experiencia de parapente',
      capacity: 10,
      displacement_duration: 60,
      price: 200,
      image: 'imageUrl',
      activity_day: new Date('2025-05-10T09:00:00-05:00'),
      activity_duration: 180,
      activity_department_id: activity1._id,
      activity_province_id: province1._id,
      activity_district_id: district1._id,
      activity_city_id: city1._id,
      activity_address: 'A la altura de la polleria, 250',
      activity_time: new Date('2025-05-10T09:00:00-05:00'),
      meeting_department_id: activity1._id,
      meeting_province_id: province1._id,
      meeting_district_id: district1._id,
      meeting_city_id: city1._id,
      meeting_address: 'A la altura de la polleria, 250',
      meeting_time: new Date('2025-05-10T09:00:00-05:00'),
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const product14 = await productModel.create({
      name: 'Montañismo en la montaña profunda',
      activity_id: activity14._id,
      category_id: category3._id,
      risk_id: risk3._id,
      campus_id: campus1._id,
      description: 'Disfruta de esta experiencia de parapente',
      capacity: 10,
      displacement_duration: 60,
      price: 200,
      image: 'imageUrl',
      activity_day: new Date('2025-05-10T09:00:00-05:00'),
      activity_duration: 180,
      activity_department_id: activity1._id,
      activity_province_id: province1._id,
      activity_district_id: district1._id,
      activity_city_id: city1._id,
      activity_address: 'A la altura de la polleria, 250',
      activity_time: new Date('2025-05-10T09:00:00-05:00'),
      meeting_department_id: activity1._id,
      meeting_province_id: province1._id,
      meeting_district_id: district1._id,
      meeting_city_id: city1._id,
      meeting_address: 'A la altura de la polleria, 250',
      meeting_time: new Date('2025-05-10T09:00:00-05:00'),
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const product15 = await productModel.create({
      name: 'Bunjee en el puente del amor',
      activity_id: activity15._id,
      category_id: category2._id,
      risk_id: risk1._id,
      campus_id: campus1._id,
      description: 'Disfruta de esta experiencia de parapente',
      capacity: 10,
      displacement_duration: 60,
      price: 200,
      image: 'imageUrl',
      activity_day: new Date('2025-05-10T09:00:00-05:00'),
      activity_duration: 180,
      activity_department_id: activity1._id,
      activity_province_id: province1._id,
      activity_district_id: district1._id,
      activity_city_id: city1._id,
      activity_address: 'A la altura de la polleria, 250',
      activity_time: new Date('2025-05-10T09:00:00-05:00'),
      meeting_department_id: activity1._id,
      meeting_province_id: province1._id,
      meeting_district_id: district1._id,
      meeting_city_id: city1._id,
      meeting_address: 'A la altura de la polleria, 250',
      meeting_time: new Date('2025-05-10T09:00:00-05:00'),
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const product16 = await productModel.create({
      name: 'Snorkel en la playa',
      activity_id: activity16._id,
      category_id: category1._id,
      risk_id: risk2._id,
      campus_id: campus1._id,
      description: 'Disfruta de esta experiencia de parapente',
      capacity: 10,
      displacement_duration: 60,
      price: 200,
      image: 'imageUrl',
      activity_day: new Date('2025-05-10T09:00:00-05:00'),
      activity_duration: 180,
      activity_department_id: activity1._id,
      activity_province_id: province1._id,
      activity_district_id: district1._id,
      activity_city_id: city1._id,
      activity_address: 'A la altura de la polleria, 250',
      activity_time: new Date('2025-05-10T09:00:00-05:00'),
      meeting_department_id: activity1._id,
      meeting_province_id: province1._id,
      meeting_district_id: district1._id,
      meeting_city_id: city1._id,
      meeting_address: 'A la altura de la polleria, 250',
      meeting_time: new Date('2025-05-10T09:00:00-05:00'),
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const product17 = await productModel.create({
      name: 'Puenting de la montaña',
      activity_id: activity17._id,
      category_id: category2._id,
      risk_id: risk1._id,
      campus_id: campus1._id,
      description: 'Disfruta de esta experiencia de parapente',
      capacity: 10,
      displacement_duration: 60,
      price: 200,
      image: 'imageUrl',
      activity_day: new Date('2025-05-10T09:00:00-05:00'),
      activity_duration: 180,
      activity_department_id: activity1._id,
      activity_province_id: province1._id,
      activity_district_id: district1._id,
      activity_city_id: city1._id,
      activity_address: 'A la altura de la polleria, 250',
      activity_time: new Date('2025-05-10T09:00:00-05:00'),
      meeting_department_id: activity1._id,
      meeting_province_id: province1._id,
      meeting_district_id: district1._id,
      meeting_city_id: city1._id,
      meeting_address: 'A la altura de la polleria, 250',
      meeting_time: new Date('2025-05-10T09:00:00-05:00'),
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const product18 = await productModel.create({
      name: 'Cabalgata por el sendero',
      activity_id: activity18._id,
      category_id: category3._id,
      risk_id: risk3._id,
      campus_id: campus1._id,
      description: 'Disfruta de esta experiencia de parapente',
      capacity: 10,
      displacement_duration: 60,
      price: 200,
      image: 'imageUrl',
      activity_day: new Date('2025-05-10T09:00:00-05:00'),
      activity_duration: 180,
      activity_department_id: activity1._id,
      activity_province_id: province1._id,
      activity_district_id: district1._id,
      activity_city_id: city1._id,
      activity_address: 'A la altura de la polleria, 250',
      activity_time: new Date('2025-05-10T09:00:00-05:00'),
      meeting_department_id: activity1._id,
      meeting_province_id: province1._id,
      meeting_district_id: district1._id,
      meeting_city_id: city1._id,
      meeting_address: 'A la altura de la polleria, 250',
      meeting_time: new Date('2025-05-10T09:00:00-05:00'),
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const product19 = await productModel.create({
      name: 'Camping en la selva',
      activity_id: activity19._id,
      category_id: category3._id,
      risk_id: risk3._id,
      campus_id: campus1._id,
      description: 'Disfruta de esta experiencia de parapente',
      capacity: 10,
      displacement_duration: 60,
      price: 200,
      image: 'imageUrl',
      activity_day: new Date('2025-05-10T09:00:00-05:00'),
      activity_duration: 180,
      activity_department_id: activity1._id,
      activity_province_id: province1._id,
      activity_district_id: district1._id,
      activity_city_id: city1._id,
      activity_address: 'A la altura de la polleria, 250',
      activity_time: new Date('2025-05-10T09:00:00-05:00'),
      meeting_department_id: activity1._id,
      meeting_province_id: province1._id,
      meeting_district_id: district1._id,
      meeting_city_id: city1._id,
      meeting_address: 'A la altura de la polleria, 250',
      meeting_time: new Date('2025-05-10T09:00:00-05:00'),
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const product20 = await productModel.create({
      name: 'Caminata urbana por la playa',
      activity_id: activity20._id,
      category_id: category3._id,
      risk_id: risk3._id,
      campus_id: campus1._id,
      description: 'Disfruta de esta experiencia de parapente',
      capacity: 10,
      displacement_duration: 60,
      price: 200,
      image: 'imageUrl',
      activity_day: new Date('2025-05-10T09:00:00-05:00'),
      activity_duration: 180,
      activity_department_id: activity1._id,
      activity_province_id: province1._id,
      activity_district_id: district1._id,
      activity_city_id: city1._id,
      activity_address: 'A la altura de la polleria, 250',
      activity_time: new Date('2025-05-10T09:00:00-05:00'),
      meeting_department_id: activity1._id,
      meeting_province_id: province1._id,
      meeting_district_id: district1._id,
      meeting_city_id: city1._id,
      meeting_address: 'A la altura de la polleria, 250',
      meeting_time: new Date('2025-05-10T09:00:00-05:00'),
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const promProduct1 = await promProductModel.create({
      product_id: product2._id,
      promotion_id: promotion1._id,
      percentage: 0.3,
    });

    const user1 = await userModel.create({
      names: 'Gojo Catara',
      last_names: 'Vasquez Miguel',
      dni: '38290481',
      email: 'user1@hotmail.com',
      password: hashedPassword,
      telephone: '194736271',
      is_available: true,
    });

    const sale1 = await saleModel.create({
      total: 400,
      purchase_day: new Date('2025-05-10T09:00:00-05:00'),
      purchase_time: new Date('2025-05-10T09:00:00-05:00'),
      user_id: user1._id,
    });

    const saleDetail1 = await saleDetailModel.create({
      sale_id: sale1._id,
      product_id: product1._id,
      price: 200,
    });

    const saleDetail2 = await saleDetailModel.create({
      sale_id: sale1._id,
      product_id: product2._id,
      price: 200,
    });

    const sale2 = await saleModel.create({
      total: 400,
      purchase_day: new Date('2025-05-10T09:00:00-05:00'),
      purchase_time: new Date('2025-05-10T09:00:00-05:00'),
      user_id: user1._id,
    });

    const saleDetail3 = await saleDetailModel.create({
      sale_id: sale1._id,
      product_id: product3._id,
      price: 200,
    });

    const saleDetail4 = await saleDetailModel.create({
      sale_id: sale1._id,
      product_id: product4._id,
      price: 200,
    });

    const sale3 = await saleModel.create({
      total: 400,
      purchase_day: new Date('2025-05-10T09:00:00-05:00'),
      purchase_time: new Date('2025-05-10T09:00:00-05:00'),
      user_id: user1._id,
    });

    const saleDetail5 = await saleDetailModel.create({
      sale_id: sale1._id,
      product_id: product5._id,
      price: 200,
    });

    const saleDetail6 = await saleDetailModel.create({
      sale_id: sale1._id,
      product_id: product6._id,
      price: 200,
    });

    const sale4 = await saleModel.create({
      total: 400,
      purchase_day: new Date('2025-05-10T09:00:00-05:00'),
      purchase_time: new Date('2025-05-10T09:00:00-05:00'),
      user_id: user1._id,
    });

    const saleDetail7 = await saleDetailModel.create({
      sale_id: sale1._id,
      product_id: product7._id,
      price: 200,
    });

    const saleDetail8 = await saleDetailModel.create({
      sale_id: sale1._id,
      product_id: product8._id,
      price: 200,
    });

    const sale5 = await saleModel.create({
      total: 400,
      purchase_day: new Date('2025-05-10T09:00:00-05:00'),
      purchase_time: new Date('2025-05-10T09:00:00-05:00'),
      user_id: user1._id,
    });

    const saleDetail9 = await saleDetailModel.create({
      sale_id: sale1._id,
      product_id: product9._id,
      price: 200,
    });

    const saleDetail10 = await saleDetailModel.create({
      sale_id: sale1._id,
      product_id: product10._id,
      price: 200,
    });

    const sale6 = await saleModel.create({
      total: 400,
      purchase_day: new Date('2025-05-10T09:00:00-05:00'),
      purchase_time: new Date('2025-05-10T09:00:00-05:00'),
      user_id: user1._id,
    });

    const saleDetail11 = await saleDetailModel.create({
      sale_id: sale1._id,
      product_id: product11._id,
      price: 200,
    });

    const saleDetail12 = await saleDetailModel.create({
      sale_id: sale1._id,
      product_id: product12._id,
      price: 200,
    });

    const sale7 = await saleModel.create({
      total: 400,
      purchase_day: new Date('2025-05-10T09:00:00-05:00'),
      purchase_time: new Date('2025-05-10T09:00:00-05:00'),
      user_id: user1._id,
    });

    const saleDetail13 = await saleDetailModel.create({
      sale_id: sale1._id,
      product_id: product13._id,
      price: 200,
    });

    const saleDetail14 = await saleDetailModel.create({
      sale_id: sale1._id,
      product_id: product14._id,
      price: 200,
    });

    const sale8 = await saleModel.create({
      total: 400,
      purchase_day: new Date('2025-05-10T09:00:00-05:00'),
      purchase_time: new Date('2025-05-10T09:00:00-05:00'),
      user_id: user1._id,
    });

    const saleDetail15 = await saleDetailModel.create({
      sale_id: sale1._id,
      product_id: product15._id,
      price: 200,
    });

    const saleDetail16 = await saleDetailModel.create({
      sale_id: sale1._id,
      product_id: product16._id,
      price: 200,
    });

    const sale9 = await saleModel.create({
      total: 400,
      purchase_day: new Date('2025-05-10T09:00:00-05:00'),
      purchase_time: new Date('2025-05-10T09:00:00-05:00'),
      user_id: user1._id,
    });

    const saleDetail17 = await saleDetailModel.create({
      sale_id: sale1._id,
      product_id: product17._id,
      price: 200,
    });

    const saleDetail18 = await saleDetailModel.create({
      sale_id: sale1._id,
      product_id: product18._id,
      price: 200,
    });

    const sale10 = await saleModel.create({
      total: 400,
      purchase_day: new Date('2025-05-10T09:00:00-05:00'),
      purchase_time: new Date('2025-05-10T09:00:00-05:00'),
      user_id: user1._id,
    });

    const saleDetail19 = await saleDetailModel.create({
      sale_id: sale1._id,
      product_id: product19._id,
      price: 200,
    });

    const saleDetail20 = await saleDetailModel.create({
      sale_id: sale1._id,
      product_id: product20._id,
      price: 200,
    });

    console.log('Seed creado correctamente');
    console.log({
      admin1,
      company1,
      campus1,
      employee1,
      employee2,
      employee3,
      department1,
      province1,
      district1,
      city1,
      event1,
      event2,
      event3,
      coupon1,
      promotion1,
      activity1,
      category1,
      risk1,
      product1,
      product2,
      promProduct1,
      user1,
      sale1,
      saleDetail1,
      saleDetail2,
    });

    await app.close();
  } catch (error) {
    console.error('Error al crear datos iniciales:', error);
    process.exit(1);
  }
}

seed();
