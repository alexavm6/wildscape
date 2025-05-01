import { Module } from '@nestjs/common';
import { DistrictService } from './district.service';
import { DistrictController } from './district.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CampusModule } from '@campus/campus.module';
import { District, DistrictSchema } from './schema/district.schema';

@Module({
  imports: [
    CampusModule,
    MongooseModule.forFeature([
      { name: District.name, schema: DistrictSchema },
    ]),
  ],
  controllers: [DistrictController],
  providers: [DistrictService],
  exports: [
    MongooseModule.forFeature([
      { name: District.name, schema: DistrictSchema },
    ]),
  ],
})
export class DistrictModule {}
