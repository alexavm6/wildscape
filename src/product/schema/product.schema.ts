import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Campus } from '@campus/schema/campus.schema';
import { Department } from '@department/schema/department.schema';
import { Province } from '@province/schema/province.schema';
import { District } from '@district/schema/district.schema';
import { City } from '@city/schema/city.schema';
import { Activity } from '@activity/schema/activity.schema';
import { Category } from '@category/schema/category.schema';
import { Risk } from '@risk/schema/risk.schema';

//for injecting
export type ProductDocument = HydratedDocument<Product>;

@Schema({
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;
      return ret;
    },
  },
})
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Activity.name,
  })
  activity_id?: Activity;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Category.name,
  })
  category_id?: Category;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Risk.name,
  })
  risk_id?: Risk;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Campus.name,
  })
  campus_id?: Campus;

  @Prop()
  capacity?: number;

  @Prop()
  registered?: number;

  @Prop()
  price?: number;

  @Prop()
  image?: string;

  @Prop()
  activity_day?: Date;

  @Prop()
  activity_duration?: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Department.name,
  })
  activity_department_id?: Department;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Province.name,
  })
  activity_province_id?: Province;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: District.name,
  })
  activity_district_id?: District;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: City.name,
  })
  activity_city_id?: City;

  @Prop()
  activity_address?: string;

  @Prop()
  activity_time?: Date;

  @Prop({ default: false })
  is_available?: boolean;

  @Prop({ default: true })
  registration_availability?: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
