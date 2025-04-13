import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';

//for injecting
export type CampusDocument = HydratedDocument<Campus>;

import { Company } from '../../company/schema/company.schema';

// inside the class definition
@Schema({ timestamps: true })
export class Campus {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  annex: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Company.name,
    required: true,
  })
  company_id: Company;

  @Prop({ default: true })
  state: boolean;
}

export const CampusSchema = SchemaFactory.createForClass(Campus);
