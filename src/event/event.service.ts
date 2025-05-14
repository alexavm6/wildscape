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
import { PaginationDto } from '@common/dto/pagination.dto';
import { PaginationSimpleDto } from '@common/dto/pagination-simple.dto';
import { PaginationManagementSearchEventDto } from './dto/pagination-management-search-event.dto';
import { PaginationSimpleSearchEventDto } from './dto/pagination-simple-search-event.dto';

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

  async findAll(paginationDto: PaginationDto): Promise<Event[]> {
    const { limit = 5, offset = 0 } = paginationDto;

    const events = await this.eventModel
      .find({ is_available: true })
      .select('name description price')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(offset);

    return events;
  }

  async findAllSearch(
    paginationSimpleSearchEventDto: PaginationSimpleSearchEventDto,
  ): Promise<Event[]> {
    const {
      limit = 5,
      offset = 0,
      simple = 'false',
      name,
      description,
      campus_id,
      price,
      min_price,
      max_price,
      department_id,
      province_id,
      district_id,
      city_id,
      address,
      capacity,
      min_capacity,
      max_capacity,
    } = paginationSimpleSearchEventDto;

    const filter: any = { is_available: true };

    if (name) filter.name = { $regex: name, $options: 'i' };
    if (description)
      filter.description = { $regex: description, $options: 'i' };
    if (address) filter.address = { $regex: address, $options: 'i' };

    if (campus_id) filter.campus_id = campus_id;
    if (department_id) filter.department_id = department_id;
    if (province_id) filter.province_id = province_id;
    if (district_id) filter.district_id = district_id;
    if (city_id) filter.city_id = city_id;

    if (price) filter.price = price;
    if (min_price !== undefined && max_price !== undefined) {
      filter.price = { $gte: min_price, $lte: max_price };
    } else if (min_price !== undefined) {
      filter.price = { $gte: min_price };
    } else if (max_price !== undefined) {
      filter.price = { $lte: max_price };
    }

    if (capacity) filter.capacity = capacity;
    if (min_capacity !== undefined && max_capacity !== undefined) {
      filter.capacity = { $gte: min_capacity, $lte: max_capacity };
    } else if (min_capacity !== undefined) {
      filter.capacity = { $gte: min_capacity };
    } else if (max_capacity !== undefined) {
      filter.capacity = { $lte: max_capacity };
    }

    const isSimple = simple === 'true';

    if (isSimple) {
      const events = await this.eventModel
        .find(filter)
        .select('name description price')
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(offset);

      return events;
    }

    const events = await this.eventModel
      .find(filter)
      .sort({ createdAt: -1 })
      .select('-is_available')
      .populate({
        path: 'campus_id',
        model: 'Campus',
        select: 'name -_id',
      })
      .populate({
        path: 'department_id',
        model: 'Department',
        select: 'name -_id',
      })
      .populate({
        path: 'province_id',
        model: 'Province',
        select: 'name -_id',
      })
      .populate({
        path: 'district_id',
        model: 'District',
        select: 'name -_id',
      })
      .populate({
        path: 'city_id',
        model: 'City',
        select: 'name -_id',
      })
      .limit(limit)
      .skip(offset);

    return events;
  }

  async findAllManagementSearch(
    paginationManagementSearchEventDto: PaginationManagementSearchEventDto,
  ): Promise<Event[]> {
    const {
      limit = 5,
      offset = 0,
      name,
      description,
      campus_id,
      price,
      min_price,
      max_price,
      department_id,
      province_id,
      district_id,
      city_id,
      address,
      capacity,
      min_capacity,
      max_capacity,
      is_available = 'all',
    } = paginationManagementSearchEventDto;

    const filter: any = {};

    if (name) filter.name = { $regex: name, $options: 'i' };
    if (description)
      filter.description = { $regex: description, $options: 'i' };
    if (address) filter.address = { $regex: address, $options: 'i' };

    if (campus_id) filter.campus_id = campus_id;
    if (department_id) filter.department_id = department_id;
    if (province_id) filter.province_id = province_id;
    if (district_id) filter.district_id = district_id;
    if (city_id) filter.city_id = city_id;

    if (price) filter.price = price;
    if (min_price !== undefined && max_price !== undefined) {
      filter.price = { $gte: min_price, $lte: max_price };
    } else if (min_price !== undefined) {
      filter.price = { $gte: min_price };
    } else if (max_price !== undefined) {
      filter.price = { $lte: max_price };
    }

    if (capacity) filter.capacity = capacity;
    if (min_capacity !== undefined && max_capacity !== undefined) {
      filter.capacity = { $gte: min_capacity, $lte: max_capacity };
    } else if (min_capacity !== undefined) {
      filter.capacity = { $gte: min_capacity };
    } else if (max_capacity !== undefined) {
      filter.capacity = { $lte: max_capacity };
    }

    if (is_available && is_available !== 'all') {
      filter.is_available = is_available === 'true';
    }

    const events = await this.eventModel
      .find(filter)
      .sort({ createdAt: -1 })
      .populate({
        path: 'campus_id',
        model: 'Campus',
        select: 'name -_id',
      })
      .populate({
        path: 'department_id',
        model: 'Department',
        select: 'name -_id',
      })
      .populate({
        path: 'province_id',
        model: 'Province',
        select: 'name -_id',
      })
      .populate({
        path: 'district_id',
        model: 'District',
        select: 'name -_id',
      })
      .populate({
        path: 'city_id',
        model: 'City',
        select: 'name -_id',
      })
      .limit(limit)
      .skip(offset);

    return events;
  }

  async findById(id: string): Promise<Event> {
    const event = await this.eventModel
      .findOne({ _id: id, is_available: true })
      .select('-is_available')
      .populate({
        path: 'campus_id',
        model: 'Campus',
        select: 'name -_id',
      })
      .populate({
        path: 'department_id',
        model: 'Department',
        select: 'name -_id',
      })
      .populate({
        path: 'province_id',
        model: 'Province',
        select: 'name -_id',
      })
      .populate({
        path: 'district_id',
        model: 'District',
        select: 'name -_id',
      })
      .populate({
        path: 'city_id',
        model: 'City',
        select: 'name -_id',
      });

    if (!event) {
      throw new NotFoundException(`Evento con id ${id} no encontrado`);
    }

    return event;
  }

  async findByIdManagement(id: string): Promise<Event> {
    const event = await this.eventModel
      .findById(id)
      .populate({
        path: 'campus_id',
        model: 'Campus',
        select: 'name -_id',
      })
      .populate({
        path: 'department_id',
        model: 'Department',
        select: 'name -_id',
      })
      .populate({
        path: 'province_id',
        model: 'Province',
        select: 'name -_id',
      })
      .populate({
        path: 'district_id',
        model: 'District',
        select: 'name -_id',
      })
      .populate({
        path: 'city_id',
        model: 'City',
        select: 'name -_id',
      });

    if (!event) {
      throw new NotFoundException(`Evento con id ${id} no encontrado`);
    }

    return event;
  }

  async updateById(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    const updatedEvent = await this.eventModel
      .findByIdAndUpdate(id, updateEventDto, { new: true })
      .populate({
        path: 'campus_id',
        model: 'Campus',
        select: 'name -_id',
      })
      .populate({
        path: 'department_id',
        model: 'Department',
        select: 'name -_id',
      })
      .populate({
        path: 'province_id',
        model: 'Province',
        select: 'name -_id',
      })
      .populate({
        path: 'district_id',
        model: 'District',
        select: 'name -_id',
      })
      .populate({
        path: 'city_id',
        model: 'City',
        select: 'name -_id',
      });

    if (!updatedEvent) {
      throw new NotFoundException(`Evento con ${id} no encontrado`);
    }

    return updatedEvent;
  }

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const createdEvent = await this.eventModel.create(createEventDto);

    const populatedEvent = await this.eventModel
      .findById(createdEvent._id)
      .populate({
        path: 'campus_id',
        model: 'Campus',
        select: 'name -_id',
      })
      .populate({
        path: 'department_id',
        model: 'Department',
        select: 'name -_id',
      })
      .populate({
        path: 'province_id',
        model: 'Province',
        select: 'name -_id',
      })
      .populate({
        path: 'district_id',
        model: 'District',
        select: 'name -_id',
      })
      .populate({
        path: 'city_id',
        model: 'City',
        select: 'name -_id',
      });

    if (!populatedEvent) {
      throw new NotFoundException(`Error al poblar el evento recién creado`);
    }

    return populatedEvent;
  }

  async delete(id: string): Promise<Event> {
    const event = await this.eventModel.findByIdAndDelete(id);
    if (!event) {
      throw new NotFoundException(`Evento con ID ${id} no encontrado`);
    }
    return event;
  }
}
