import { Module } from '@nestjs/common';
import { RiskService } from './risk.service';
import { RiskController } from './risk.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CampusModule } from 'src/campus/campus.module';
import { Risk, RiskSchema } from './schema/risk.schema';

@Module({
  imports: [
    CampusModule,
    MongooseModule.forFeature([{ name: Risk.name, schema: RiskSchema }]),
  ],
  controllers: [RiskController],
  providers: [RiskService],
  exports: [
    MongooseModule.forFeature([{ name: Risk.name, schema: RiskSchema }]),
  ],
})
export class RiskModule {}
