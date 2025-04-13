import { Module } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { ProvinceController } from './province.controller';
import { CampusModule } from 'src/campus/campus.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Province, ProvinceSchema } from './schema/province.schema';

@Module({
  imports: [
    CampusModule,
    MongooseModule.forFeature([
      { name: Province.name, schema: ProvinceSchema },
    ]),
  ],
  controllers: [ProvinceController],
  providers: [ProvinceService],
  exports: [
    MongooseModule.forFeature([
      { name: Province.name, schema: ProvinceSchema },
    ]),
  ],
})
export class ProvinceModule {}
