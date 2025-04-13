import { Module } from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import { AdministratorController } from './administrator.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Administrator,
  AdministratorSchema,
} from './schema/administrator.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Administrator.name, schema: AdministratorSchema },
    ]),
  ],
  controllers: [AdministratorController],
  providers: [AdministratorService],
  exports: [
    MongooseModule.forFeature([
      { name: Administrator.name, schema: AdministratorSchema },
    ]),
  ],
})
export class AdministratorModule {}
