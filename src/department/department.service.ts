import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department, DepartmentDocument } from './schema/department.schema';
import { PaginationManagementDto } from '@common/dto/management/pagination-management.dto';
import { PaginationDto } from '@common/dto/pagination.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department.name)
    private departmentModel: Model<DepartmentDocument>,
  ) {}

  //user area
  async findAllProductFilter(): Promise<Department[]> {
    const departments = await this.departmentModel
      .find({ is_available: true })
      .select('name')
      .sort({ name: 1 });

    return departments;
  }

  //Management area
  async findAllManagementFilter(name?: string): Promise<Department[]> {
    const filter: any = {};
    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }
    const departments = await this.departmentModel
      .find(filter)
      .select('name')
      .sort({ name: 1 });

    return departments;
  }

  async findAllManagement(
    paginationFindAllManagementDto: PaginationManagementDto,
  ): Promise<Department[]> {
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

    const departments = await this.departmentModel
      .find(filter)
      .sort({ name: 1 })
      .limit(limit)
      .skip(offset);
    return departments;
  }

  async findByIdManagement(id: string): Promise<Department> {
    const department = await this.departmentModel.findById(id);

    if (!department) {
      throw new NotFoundException(`Department con id ${id} no encontrado`);
    }

    return department;
  }

  async updateById(
    id: string,
    updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<Department> {
    const updatedDepartment = await this.departmentModel.findByIdAndUpdate(
      id,
      updateDepartmentDto,
      { new: true },
    );

    if (!updatedDepartment) {
      throw new NotFoundException(`Department con ${id} no encontrado`);
    }

    return updatedDepartment;
  }

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    return await this.departmentModel.create(createDepartmentDto);
  }

  async delete(id: string): Promise<Department> {
    const department = await this.departmentModel.findByIdAndDelete(id);
    if (!department) {
      throw new NotFoundException(`Department con ID ${id} no encontrado`);
    }
    return department;
  }
}
