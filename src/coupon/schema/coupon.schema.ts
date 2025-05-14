import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

//for injecting
export type CouponDocument = HydratedDocument<Coupon>;

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class Coupon {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  percentage: number;

  @Prop({ required: true })
  start_day: Date;

  @Prop({ required: true })
  end_day: Date;

  @Prop({ default: false })
  is_available: boolean;
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);
