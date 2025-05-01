import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Campus } from '@campus/schema/campus.schema';
import * as mongoose from 'mongoose';

//for injecting
export type CouponDocument = HydratedDocument<Coupon>;

@Schema()
export class Coupon {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  percentage: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Campus.name,
    required: true,
  })
  campus_id: Campus;

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

export const CouponSchema = SchemaFactory.createForClass(Coupon);
