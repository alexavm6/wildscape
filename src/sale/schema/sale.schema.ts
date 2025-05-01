import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '@user/schema/user.schema';

//for injecting
export type SaleDocument = HydratedDocument<Sale>;

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
export class Sale {
  @Prop({ required: true })
  total: number;

  @Prop({ default: () => new Date() })
  purchase_day: Date;

  @Prop({ default: () => new Date() })
  purchase_time: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  user_id: User;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
