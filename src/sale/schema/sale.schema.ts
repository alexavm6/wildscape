import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/schema/user.schema';

//for injecting
export type SaleDocument = HydratedDocument<Sale>;

@Schema({ timestamps: true })
export class Sale {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  user_id: User;

  @Prop({ required: true })
  total: number;

  @Prop({ required: true, default: () => new Date() })
  purchase_day: Date;

  @Prop({ required: true, default: () => new Date() })
  purchase_time: Date;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
