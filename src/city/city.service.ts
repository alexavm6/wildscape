import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City, CityDocument } from './schema/city.schema';
import { PaginationManagementSearchCityDto } from './dto/pagination-management-search-city.dto';
import { PaginationSearchCityDto } from './dto/pagination-search-city.dto';
import { PaginationDto } from '@common/dto/pagination.dto';
@Injectable()
export class CityService {
  constructor(@InjectModel(City.name) private cityModel: Model<CityDocument>) {}

  async findAll(paginationDto: PaginationDto): Promise<City[]> {
    const { limit = 5, offset = 0 } = paginationDto;

    const cities = await this.cityModel
      .find({ is_available: true })
      .select('name image')
      .limit(limit)
      .skip(offset);

    return cities;
  }

  async findAllSearch(
    paginationSearchCityDto: PaginationSearchCityDto,
  ): Promise<City[]> {
    const { limit = 5, offset = 0, name } = paginationSearchCityDto;

    const filter: any = { is_available: true };

    if (name) filter.name = { $regex: name, $options: 'i' };

    const cities = await this.cityModel
      .find(filter)
      .select('-is_available')
      .limit(limit)
      .skip(offset);

    return cities;
  }

  async findAllManagementSearch(
    paginationManagementSearchCityDto: PaginationManagementSearchCityDto,
  ): Promise<City[]> {
    const {
      limit = 5,
      offset = 0,
      name,
      is_available = 'all',
    } = paginationManagementSearchCityDto;

    const filter: any = {};

    if (name) filter.name = { $regex: name, $options: 'i' };

    if (is_available && is_available !== 'all') {
      filter.is_available = is_available === 'true';
    }

    const cities = await this.cityModel.find(filter).limit(limit).skip(offset);

    return cities;
  }

  async findById(id: string): Promise<City> {
    const city = await this.cityModel
      .findOne({ _id: id, is_available: true })
      .select('-is_available');

    if (!city) {
      throw new NotFoundException(`City con id ${id} no encontrado`);
    }

    return city;
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
      UpdateCityDto,
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
