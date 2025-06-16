import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City, CityDocument } from './schema/city.schema';
import { PaginationManagementDto } from '@common/dto/management/pagination-management.dto';
import { PaginationDto } from '@common/dto/pagination.dto';

@Injectable()
export class CityService {
  constructor(@InjectModel(City.name) private cityModel: Model<CityDocument>) {}

  //user area
  async findAllProductFilter(): Promise<City[]> {
    const cities = await this.cityModel
      .find({ is_available: true })
      .select('name')
      .sort({ name: 1 });

    return cities;
  }

  //Management area
  async findAllManagementFilter(name?: string): Promise<City[]> {
    const filter: any = {};
    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }
    const cities = await this.cityModel
      .find(filter)
      .select('name')
      .sort({ name: 1 });

    return cities;
  }

  async findAllManagement(
    paginationFindAllManagementDto: PaginationManagementDto,
  ): Promise<City[]> {
    const {
      limit = 10,
      offset = 0,
      name,
      is_available = 'all',
    } = paginationFindAllManagementDto;

    const filter: any = {};

    if (name) filter.name = { $regex: name, $options: 'i' };
    if (is_available && is_available !== 'all') {
      filter.is_available = is_available === 'true';
    }

    const cities = await this.cityModel
      .find(filter)
      .sort({ name: 1 })
      .limit(limit)
      .skip(offset);
    return cities;
  }

  async findByIdManagement(id: string): Promise<City> {
    const city = await this.cityModel.findById(id);

    if (!city) {
      throw new NotFoundException(`City con id ${id} no encontrado`);
    }

    return city;
  }

  async updateById(id: string, updateCityDto: UpdateCityDto): Promise<City> {
    const updatedCity = await this.cityModel.findByIdAndUpdate(
      id,
      updateCityDto,
      { new: true },
    );

    if (!updatedCity) {
      throw new NotFoundException(`City con ${id} no encontrado`);
    }

    return updatedCity;
  }

  async create(createCityDto: CreateCityDto): Promise<City> {
    return await this.cityModel.create(createCityDto);
  }

  async delete(id: string): Promise<City> {
    const city = await this.cityModel.findByIdAndDelete(id);
    if (!city) {
      throw new NotFoundException(`City con ID ${id} no encontrado`);
    }
    return city;
  }
}
