import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCampusDto } from './dto/create-campus.dto';
import { UpdateCampusDto } from './dto/update-campus.dto';
import { Campus, CampusDocument } from '@campus/schema/campus.schema';
import { PaginationDto } from '@common/dto/pagination.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationManagementCampusDto } from './dto/pagination-management-campus.dto';

@Injectable()
export class CampusService {
  constructor(
    @InjectModel(Campus.name) private campusModel: Model<CampusDocument>,
  ) {}

  //Management area
  async findAllManagementFilter(name?: string): Promise<Campus[]> {
    const filter: any = {};
    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }
    const campus = await this.campusModel
      .find(filter)
      .select('name')
      .sort({ name: 1 });

    return campus;
  }

  async findAllManagement(
    paginationFindAllManagementCampusDto: PaginationManagementCampusDto,
  ): Promise<Campus[]> {
    const {
      limit = 10,
      offset = 0,
      annex,
      address,
      name,
      is_available = 'all',
    } = paginationFindAllManagementCampusDto;

    const filter: any = {};

    if (name) filter.name = { $regex: name, $options: 'i' };
    if (address) filter.address = { $regex: address, $options: 'i' };
    if (is_available && is_available !== 'all') {
      filter.is_available = is_available === 'true';
    }
    if (annex) filter.annex = annex;

    const campus = await this.campusModel
      .find(filter)
      .sort({ name: 1 })
      .limit(limit)
      .skip(offset);
    return campus;
  }

  async findByIdManagement(id: string): Promise<Campus> {
    const campus = await this.campusModel.findById(id);

    if (!campus) {
      throw new NotFoundException(`Campus con id ${id} no encontrado`);
    }

    return campus;
  }

  async updateById(
    id: string,
    updateCampusDto: UpdateCampusDto,
  ): Promise<Campus> {
    const updatedCampus = await this.campusModel.findByIdAndUpdate(
      id,
      updateCampusDto,
      { new: true },
    );

    if (!updatedCampus) {
      throw new NotFoundException(`Campus con ${id} no encontrado`);
    }

    return updatedCampus;
  }

  async create(createCampusDto: CreateCampusDto): Promise<Campus> {
    return await this.campusModel.create(createCampusDto);
  }

  async delete(id: string): Promise<Campus> {
    const campus = await this.campusModel.findByIdAndDelete(id);
    if (!campus) {
      throw new NotFoundException(`Campus con ID ${id} no encontrado`);
    }
    return campus;
  }
}
