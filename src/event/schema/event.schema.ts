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
export class Event {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Campus.name,
  })
  campus_id?: Campus;

  @Prop()
  price?: number;

  @Prop()
  image?: string;

  @Prop()
  event_day?: Date;

  @Prop()
  event_time?: Date;

  @Prop()
  capacity?: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Department.name,
  })
  department_id?: Department;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Province.name,
  })
  province_id?: Province;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: District.name,
  })
  district_id?: District;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: City.name,
  })
  city_id?: City;

  @Prop()
  address?: string;

  @Prop()
  start_day?: Date;

  @Prop()
  end_day?: Date;

  @Prop({ default: false })
  is_available?: boolean;
}

export const EventSchema = SchemaFactory.createForClass(Event);
