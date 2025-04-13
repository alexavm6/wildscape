import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

//for injecting
export type AdministratorDocument = HydratedDocument<Administrator>;

@Schema({ timestamps: true })
export class Administrator {
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

  @Prop({ default: true })
  state: boolean;
}

export const AdministratorSchema = SchemaFactory.createForClass(Administrator);
