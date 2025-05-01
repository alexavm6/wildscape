import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Campus } from '@campus/schema/campus.schema';
import { Department } from '@department/schema/department.schema';
import { Province } from '@province/schema/province.schema';
import { District } from '@district/schema/district.schema';
import { City } from '@city/schema/city.schema';

//for injecting
export type EventDocument = HydratedDocument<Event>;

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.is_available;
      return ret;
    },
  },
})
export class Event {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Campus.name,
    required: true,
  })
  campus_id: Campus;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  capacity: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Department.name,
    required: true,
  })
  department_id: Department;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Province.name,
    required: true,
  })
  province_id: Province;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: District.name,
    required: true,
  })
  district_id: District;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: City.name,
    required: true,
  })
  city_id: City;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  start_day: Date;

  @Prop({ required: true })
  start_time: Date;

  @Prop({ required: true })
  end_day: Date;

  @Prop({ required: true })
  end_time: Date;

  @Prop({ default: false })
  is_available: boolean;
}

export const EventSchema = SchemaFactory.createForClass(Event);
