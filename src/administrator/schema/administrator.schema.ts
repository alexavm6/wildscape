import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

//for injecting
export type AdministratorDocument = HydratedDocument<Administrator>;

@Schema()
export class Administrator {
  @Prop({ required: true })
  names: string;

  @Prop({ required: true })
  last_names: string;

  @Prop({ required: true, unique: true })
  dni: string;

  @Prop()
  image?: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  telephone: string;

  @Prop({ default: true })
  is_available: boolean;
}

export const AdministratorSchema = SchemaFactory.createForClass(Administrator);
