import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { CampusModule } from '@campus/campus.module';
import { DepartmentModule } from '@department/department.module';
import { ProvinceModule } from '@province/province.module';
import { DistrictModule } from '@district/district.module';
import { CityModule } from '@city/city.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './schema/event.schema';

@Module({
  imports: [
    CampusModule,
    DepartmentModule,
    ProvinceModule,
    DistrictModule,
    CityModule,
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
  controllers: [EventController],
  providers: [EventService],
  exports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
  ],
})
export class EventModule {}
