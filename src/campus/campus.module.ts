import { Module } from '@nestjs/common';
import { CampusService } from './campus.service';
import { CampusController } from './campus.controller';
import { CompanyModule } from 'src/company/company.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Campus, CampusSchema } from './schema/campus.schema';

@Module({
  imports: [
    CompanyModule,
    MongooseModule.forFeature([{ name: Campus.name, schema: CampusSchema }]),
  ],
  controllers: [CampusController],
  providers: [CampusService],
  exports: [
    MongooseModule.forFeature([{ name: Campus.name, schema: CampusSchema }]),
  ],
})
export class CampusModule {}
