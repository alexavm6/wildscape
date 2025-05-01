import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Product } from '@product/schema/product.schema';
import { Promotion } from '@promotion/schema/promotion.schema';

//for injecting
export type PromotionProductDocument = HydratedDocument<PromotionProduct>;

@Schema()
export class PromotionProduct {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Product.name,
    required: true,
  })
  product_id: Product;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Promotion.name,
    required: true,
  })
  promotion_id: Promotion;

  @Prop({ required: true })
  percentage: number;
}

export const PromotionProductSchema =
  SchemaFactory.createForClass(PromotionProduct);
