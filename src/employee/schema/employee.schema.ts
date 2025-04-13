import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Campus } from '../../campus/schema/campus.schema';

export enum EmployeeRole {
  Manager = 'employee_manager_role',
  Guide = 'employee_guide_role',
  ProductManager = 'employee_product_manager_role',
}

//for injecting
export type EmployeeDocument = HydratedDocument<Employee>;

@Schema({ timestamps: true })
export class Employee {
  @Prop({ required: true })
  names: string;

  @Prop({ required: true })
  last_names: string;

  @Prop({ required: true, unique: true })
  dni: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  telephone: string;

  @Prop({ required: true })
  address: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Campus.name,
    required: true,
  })
  campus_id: Campus;

  @Prop({ type: String, enum: Object.values(EmployeeRole), required: true })
  role: string;

  @Prop({ default: true })
  state: boolean;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
