import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Sale } from '../../sale/schema/sale.schema';
import { Product } from '../../product/schema/product.schema';

//for injecting
export type SaleDetailDocument = HydratedDocument<SaleDetail>;

@Schema({ timestamps: true })
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
    required: true,
  })
  product_id: Product;

  @Prop({ required: true })
  price: number;
}

export const SaleDetailSchema = SchemaFactory.createForClass(SaleDetail);
