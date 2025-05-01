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
      address: 'Address 1',
      delete_state: true,
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
      delete_state: true,
    });

    //employee
    const employee1 = await employeeModel.create({
      names: 'Employee 1',
      last_names: 'Employee Last Name 1',
      dni: '72947365',
      email: 'employee1@hotmail.com',
      password: hashedPassword,
      telephone: '734769264',
      address: 'Address 1',
      campus_id: campus1._id,
      role: 'employee_manager_role',
      delete_state: true,
    });

    const employee2 = await employeeModel.create({
      names: 'Employee 2',
      last_names: 'Employee Last Name 2',
      dni: '92734529',
      email: 'employee2@hotmail.com',
      password: hashedPassword,
      telephone: '194736271',
      address: 'Address 2',
      campus_id: campus1._id,
      role: 'employee_guide_role',
      delete_state: true,
    });

    const employee3 = await employeeModel.create({
      names: 'Employee 3',
      last_names: 'Employee Last Name 3',
      dni: '27495621',
      email: 'employee3@hotmail.com',
      password: hashedPassword,
      telephone: '748294382',
      address: 'Address 3',
      campus_id: campus1._id,
      role: 'employee_product_manager_role',
      delete_state: true,
    });

    //event
    const department1 = await departmentModel.create({
      name: 'Lima',
      delete_state: true,
    });

    const province1 = await provinceModel.create({
      name: 'Lima',
      delete_state: true,
    });

    const district1 = await districtModel.create({
      name: 'San Martin de Porres',
      delete_state: true,
    });

    const city1 = await cityModel.create({
      name: 'Lima',
      delete_state: true,
    });

    const event1 = await eventModel.create({
      name: 'Event 1',
      description: 'Event Description 1 False',
      campus_id: campus1._id,
      price: 10,
      capacity: 100,
      department_id: department1._id,
      province_id: province1._id,
      district_id: district1._id,
      city_id: city1._id,
      address: 'A la altura de la farmacia, 140',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      start_time: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      end_time: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const event2 = await eventModel.create({
      name: 'Event 2',
      description: 'Event Description 2 True',
      campus_id: campus1._id,
      price: 10,
      capacity: 100,
      department_id: department1._id,
      province_id: province1._id,
      district_id: district1._id,
      city_id: city1._id,
      address: 'A la altura de la farmacia, 140',
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      start_time: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      end_time: new Date('2025-05-15T09:00:00-05:00'),
      is_available: true,
    });

    const coupon1 = await couponModel.create({
      name: 'CATARA1',
      percentage: 0.9,
      campus_id: campus1._id,
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      start_time: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      end_time: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const promotion1 = await promotionModel.create({
      name: 'CyberWow Catara',
      description: 'CyberWow Catara Description',
      campus_id: campus1._id,
      start_day: new Date('2025-05-10T09:00:00-05:00'),
      start_time: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      end_time: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const activity1 = await activityModel.create({
      name: 'Canotaje',
      delete_state: true,
    });

    const category1 = await categoryModel.create({
      name: 'Acuatico',
      delete_state: true,
    });

    const risk1 = await riskModel.create({
      name: 'Alto',
      delete_state: true,
    });

    const product1 = await productModel.create({
      name: 'Canotaje en Lima',
      activity_id: activity1._id,
      category_id: category1._id,
      risk_id: risk1._id,
      campus_id: campus1._id,
      description: 'Disfruta de esta experiencia de canotaje',
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
      start_time: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      end_time: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const product2 = await productModel.create({
      name: 'Parapente en Lima',
      activity_id: activity1._id,
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
      start_time: new Date('2025-05-10T09:00:00-05:00'),
      end_day: new Date('2025-05-15T09:00:00-05:00'),
      end_time: new Date('2025-05-15T09:00:00-05:00'),
      is_available: false,
    });

    const promProductModel1 = await promProductModel.create({
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
      address: 'Address 1',
      delete_state: true,
    });

    const sale1 = await saleModel.create({
      total: 250,
      purchase_day: new Date('2025-05-10T09:00:00-05:00'),
      purchase_time: new Date('2025-05-10T09:00:00-05:00'),
      user_id: user1._id,
    });

    const saleDetail1 = await saleDetailModel.create({
      sale_id: sale1._id,
      product_type_id: product1._id,
      product_type: 'Product',
      coupon_id: null,
      price: 200,
    });

    const saleDetail2 = await saleDetailModel.create({
      sale_id: sale1._id,
      product_type_id: promProductModel1._id,
      product_type: 'PromotionProduct',
      coupon_id: null,
      price: 50,
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
      coupon1,
      promotion1,
      activity1,
      category1,
      risk1,
      product1,
      product2,
      promProductModel1,
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
