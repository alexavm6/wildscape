import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { Province, ProvinceDocument } from './schema/province.schema';
import { PaginationManagementDto } from '@common/dto/management/pagination-management.dto';
import { PaginationDto } from '@common/dto/pagination.dto';

@Injectable()
export class ProvinceService {
  constructor(
    @InjectModel(Province.name) private provinceModel: Model<ProvinceDocument>,
  ) {}

  //user area
  async findAllProductFilter(): Promise<Province[]> {
    const provinces = await this.provinceModel
      .find({ is_available: true })
      .select('name')
      .sort({ name: 1 });

    return provinces;
  }

  //Management area
  async findAllManagementFilter(name?: string): Promise<Province[]> {
    const filter: any = {};
    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }
    const provinces = await this.provinceModel
      .find(filter)
      .select('name')
      .sort({ name: 1 });

    return provinces;
  }

  async findAllManagement(
    paginationFindAllManagementDto: PaginationManagementDto,
  ): Promise<Province[]> {
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

    const provinces = await this.provinceModel
      .find(filter)
      .sort({ name: 1 })
      .limit(limit)
      .skip(offset);
    return provinces;
  }

  async findByIdManagement(id: string): Promise<Province> {
    const province = await this.provinceModel.findById(id);

    if (!province) {
      throw new NotFoundException(`Province con id ${id} no encontrado`);
    }

    return province;
  }

  async updateById(
    id: string,
    updateProvinceDto: UpdateProvinceDto,
  ): Promise<Province> {
    const updatedProvince = await this.provinceModel.findByIdAndUpdate(
      id,
      updateProvinceDto,
      { new: true },
    );

    if (!updatedProvince) {
      throw new NotFoundException(`Province con ${id} no encontrado`);
    }

    return updatedProvince;
  }

  async create(createProvinceDto: CreateProvinceDto): Promise<Province> {
    return await this.provinceModel.create(createProvinceDto);
  }

  async delete(id: string): Promise<Province> {
    const province = await this.provinceModel.findByIdAndDelete(id);
    if (!province) {
      throw new NotFoundException(`Province con ID ${id} no encontrado`);
    }
    return province;
  }
}
