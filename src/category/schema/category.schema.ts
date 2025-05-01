import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Campus } from '@campus/schema/campus.schema';

//for injecting
export type CategoryDocument = HydratedDocument<Category>;

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      delete ret.delete_state;
      return ret;
    },
  },
})
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop({ default: true })
  delete_state: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
