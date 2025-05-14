import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

//for injecting
export type UserDocument = HydratedDocument<User>;

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
export class User {
  @Prop({ required: true })
  names: string;

  @Prop()
  last_names?: string;

  @Prop()
  dni?: string;

  @Prop()
  image?: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  telephone?: string;

  @Prop({ default: true })
  is_available?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
