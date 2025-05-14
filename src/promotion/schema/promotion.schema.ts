import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Campus } from '@campus/schema/campus.schema';

//for injecting
export type PromotionDocument = HydratedDocument<Promotion>;

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
export class Promotion {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  image?: string;

  @Prop({ required: true })
  start_day: Date;

  @Prop({ required: true })
  end_day: Date;

  @Prop({ default: false })
  is_available: boolean;
}

export const PromotionSchema = SchemaFactory.createForClass(Promotion);
