import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Campus } from '@campus/schema/campus.schema';

//for injecting
export type ProvinceDocument = HydratedDocument<Province>;

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
export class Province {
  @Prop({ required: true })
  name: string;

  @Prop({ default: true })
  is_available: boolean;
}

export const ProvinceSchema = SchemaFactory.createForClass(Province);
