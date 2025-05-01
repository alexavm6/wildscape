import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Campus } from '@campus/schema/campus.schema';

//for injecting
export type PromotionDocument = HydratedDocument<Promotion>;

@Schema()
export class Promotion {
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

export const PromotionSchema = SchemaFactory.createForClass(Promotion);
