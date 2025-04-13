import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Campus } from '../../campus/schema/campus.schema';
import { Department } from '../../department/schema/department.schema';
import { Province } from '../../province/schema/province.schema';
import { District } from '../../district/schema/district.schema';
import { City } from '../../city/schema/city.schema';
import { Activity } from '../../activity/schema/activity.schema';
import { Category } from '../../category/schema/category.schema';
import { Risk } from '../../risk/schema/risk.schema';

//for injecting
export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Activity.name,
    required: true,
  })
  activity_id: Activity;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Category.name,
    required: true,
  })
  category_id: Category;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Risk.name,
    required: true,
  })
  risk_id: Risk;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Campus.name,
    required: true,
  })
  campus_id: Campus;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  capacity: number;

  @Prop({ required: true })
  displacement_duration: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  day: Date;

  @Prop({ required: true })
  duration: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Department.name,
    required: true,
  })
  activity_department_id: Department;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Province.name,
    required: true,
  })
  activity_province_id: Province;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: District.name,
    required: true,
  })
  activity_district_id: District;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: City.name,
    required: true,
  })
  activity_city_id: City;

  @Prop({ required: true })
  activity_address: string;

  @Prop({ required: true })
  activity_time: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Department.name,
    required: true,
  })
  encounter_department_id: Department;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Province.name,
    required: true,
  })
  encounter_province_id: Province;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: District.name,
    required: true,
  })
  encounter_district_id: District;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: City.name,
    required: true,
  })
  encounter_city_id: City;

  @Prop({ required: true })
  encounter_address: string;

  @Prop({ required: true })
  encounter_time: Date;

  @Prop({ default: false })
  is_available: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
