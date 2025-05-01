import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Sale } from '@sale/schema/sale.schema';
import { Product } from '@product/schema/product.schema';
import { PromotionProduct } from '@promotion-product/schema/promotion-product.schema';
import { Coupon } from '@coupon/schema/coupon.schema';
import { productType } from '@enums/enums';

//for injecting
export type SaleDetailDocument = HydratedDocument<SaleDetail>;

@Schema()
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
    default: null,
  })
  product_id: Product | null;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: PromotionProduct.name,
    default: null,
  })
  promotion_product_id: PromotionProduct | null;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Coupon.name,
    default: null,
  })
  coupon_id: Coupon | null;

  @Prop({ required: true })
  price: number;
}

export const SaleDetailSchema = SchemaFactory.createForClass(SaleDetail);
