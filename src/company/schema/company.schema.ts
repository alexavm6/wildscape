import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

//for injecting
export type CompanyDocument = HydratedDocument<Company>;

@Schema({ timestamps: true })
export class Company {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  ruc: number;

  @Prop({ required: true })
  address: string;

  @Prop({ default: true })
  state: boolean;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
