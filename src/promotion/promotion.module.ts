import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';

import { CampusModule } from 'src/campus/campus.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Promotion, PromotionSchema } from './schema/promotion.schema';

@Module({
  imports: [
    CampusModule,
    MongooseModule.forFeature([
      { name: Promotion.name, schema: PromotionSchema },
    ]),
  ],
  controllers: [PromotionController],
  providers: [PromotionService],
  exports: [
    MongooseModule.forFeature([
      { name: Promotion.name, schema: PromotionSchema },
    ]),
  ],
})
export class PromotionModule {}
