import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CampusModule } from 'src/campus/campus.module';
import { City, CitySchema } from './schema/city.schema';

@Module({
  imports: [
    CampusModule,
    MongooseModule.forFeature([{ name: City.name, schema: CitySchema }]),
  ],
  controllers: [CityController],
  providers: [CityService],
  exports: [
    MongooseModule.forFeature([{ name: City.name, schema: CitySchema }]),
  ],
})
export class CityModule {}
