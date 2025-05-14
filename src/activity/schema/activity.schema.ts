import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Campus } from '@campus/schema/campus.schema';

//for injecting
export type ActivityDocument = HydratedDocument<Activity>;

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
export class Activity {
  @Prop({ required: true })
  name: string;

  @Prop()
  image?: string;

  @Prop({ default: true })
  is_available?: boolean;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
