import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import * as mongoose from 'mongoose';
import { CampusModule } from 'src/campus/campus.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Coupon, CouponSchema } from './schema/coupon.schema';

@Module({
  imports: [
    CampusModule,
    MongooseModule.forFeature([{ name: Coupon.name, schema: CouponSchema }]),
  ],
  controllers: [CouponController],
  providers: [CouponService],
  exports: [
    MongooseModule.forFeature([{ name: Coupon.name, schema: CouponSchema }]),
  ],
})
export class CouponModule {}
