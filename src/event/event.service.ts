import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event, EventDocument } from '@event/schema/event.schema';
import { Campus, CampusDocument } from '@campus/schema/campus.schema';
import {
  Department,
  DepartmentDocument,
} from '@department/schema/department.schema';
import { Province, ProvinceDocument } from '@province/schema/province.schema';
import { District, DistrictDocument } from '@district/schema/district.schema';
import { City, CityDocument } from '@city/schema/city.schema';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    @InjectModel(Campus.name) private campusModel: Model<CampusDocument>,
    @InjectModel(Department.name)
    private departmentModel: Model<DepartmentDocument>,
    @InjectModel(Province.name) private provinceModel: Model<ProvinceDocument>,
    @InjectModel(District.name) private districtModel: Model<DistrictDocument>,
    @InjectModel(City.name) private cityModel: Model<CityDocument>,
  ) {}

  // create(createEventDto: CreateEventDto) {
  //   return 'This action adds a new event';
  // }

  async findAll(): Promise<Event[]> {
    return await this.eventModel
      .find({ is_available: true })
      .populate({
        path: 'campus_id',
        model: 'Campus',
      })
      .populate({
        path: 'department_id',
        model: 'Department',
      })
      .populate({
        path: 'province_id',
        model: 'Province',
      })
      .populate({
        path: 'district_id',
        model: 'District',
      })
      .populate({
        path: 'city_id',
        model: 'City',
      });
  }

  async findById(id: string): Promise<Event> {
    const event = await this.eventModel
      .findById(id)
      .populate({
        path: 'campus_id',
        model: 'Campus',
      })
      .populate({
        path: 'department_id',
        model: 'Department',
      })
      .populate({
        path: 'province_id',
        model: 'Province',
      })
      .populate({
        path: 'district_id',
        model: 'District',
      })
      .populate({
        path: 'city_id',
        model: 'City',
      });

    if (event) {
      if (event.is_available === false) {
        throw new NotFoundException(`Evento con id ${id} no encontrado`);
      }
    } else {
      throw new NotFoundException(`Evento con id ${id} no encontrado`);
    }

    return event;
  }

  // update(id: number, updateEventDto: UpdateEventDto) {
  //   return `This action updates a #${id} event`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} event`;
  // }
}
