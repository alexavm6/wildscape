import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { District, DistrictDocument } from './schema/district.schema';
import { PaginationManagementDto } from '@common/dto/management/pagination-management.dto';
import { PaginationDto } from '@common/dto/pagination.dto';

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(District.name) private districtModel: Model<DistrictDocument>,
  ) {}

  //user area
  async findAllProductFilter(): Promise<District[]> {
    const districts = await this.districtModel
      .find({ is_available: true })
      .select('name')
      .sort({ name: 1 });

    return districts;
  }

  //Management area
  async findAllManagementFilter(name?: string): Promise<District[]> {
    const filter: any = {};
    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }
    const districts = await this.districtModel
      .find(filter)
      .select('name')
      .sort({ name: 1 });

    return districts;
  }

  async findAllManagement(
    paginationFindAllManagementDto: PaginationManagementDto,
  ): Promise<District[]> {
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

    const districts = await this.districtModel
      .find(filter)
      .sort({ name: 1 })
      .limit(limit)
      .skip(offset);
    return districts;
  }

  async findByIdManagement(id: string): Promise<District> {
    const district = await this.districtModel.findById(id);

    if (!district) {
      throw new NotFoundException(`District con id ${id} no encontrado`);
    }

    return district;
  }

  async updateById(
    id: string,
    updateDistrictDto: UpdateDistrictDto,
  ): Promise<District> {
    const updatedDistrict = await this.districtModel.findByIdAndUpdate(
      id,
      updateDistrictDto,
      { new: true },
    );

    if (!updatedDistrict) {
      throw new NotFoundException(`District con ${id} no encontrado`);
    }

    return updatedDistrict;
  }

  async create(createDistrictDto: CreateDistrictDto): Promise<District> {
    return await this.districtModel.create(createDistrictDto);
  }

  async delete(id: string): Promise<District> {
    const district = await this.districtModel.findByIdAndDelete(id);
    if (!district) {
      throw new NotFoundException(`District con ID ${id} no encontrado`);
    }
    return district;
  }
}
