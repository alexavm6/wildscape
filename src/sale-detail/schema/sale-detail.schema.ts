import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Sale } from '@sale/schema/sale.schema';
import { Product } from '@product/schema/product.schema';
import { PromotionProduct } from '@promotion-product/schema/promotion-product.schema';
import { Coupon } from '@coupon/schema/coupon.schema';

//for injecting
export type SaleDetailDocument = HydratedDocument<SaleDetail>;

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
export class SaleDetail {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Sale.name,
    required: true,
  })
  sale_id: Sale;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Product.name,
  })
  product_id?: Product;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Coupon.name,
  })
  coupon_id?: Coupon;

  @Prop({ required: true })
  price: number;
}

export const SaleDetailSchema = SchemaFactory.createForClass(SaleDetail);
