import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

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
export class Company {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  ruc: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
