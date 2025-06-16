import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

//for injecting
export type CampusDocument = HydratedDocument<Campus>;

import { Company } from '@company/schema/company.schema';

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
export class Campus {
  @Prop({ required: true })
  name: string;

  @Prop()
  address?: string;

  @Prop()
  annex?: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Company.name,
  })
  company_id?: Company;

  @Prop({ default: true })
  is_available?: boolean;
}

export const CampusSchema = SchemaFactory.createForClass(Campus);
