import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from '@category/schema/category.schema';
import { PaginationDto } from '@common/dto/pagination.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationManagementDto } from '@common/dto/management/pagination-management.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  //user area
  async findAll(paginationDto: PaginationDto): Promise<Category[]> {
    const { limit = 3, offset = 0 } = paginationDto;

    const categories = await this.categoryModel
      .find({ is_available: true })
      .select('name image')
      .sort({ name: 1 })
      .limit(limit)
      .skip(offset);

    return categories;
  }

  async findAllProductFilter(): Promise<Category[]> {
    const categories = await this.categoryModel
      .find({ is_available: true })
      .select('name')
      .sort({ name: 1 });

    return categories;
  }

  //Management area
  async findAllManagementFilter(name?: string): Promise<Category[]> {
    const filter: any = {};
    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }
    const categories = await this.categoryModel
      .find(filter)
      .select('name')
      .sort({ name: 1 });

    return categories;
  }

  async findAllManagement(
    paginationFindAllManagementDto: PaginationManagementDto,
  ): Promise<Category[]> {
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

    const categories = await this.categoryModel
      .find(filter)
      .sort({ name: 1 })
      .limit(limit)
      .skip(offset);
    return categories;
  }

  async findByIdManagement(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id);

    if (!category) {
      throw new NotFoundException(`Category con id ${id} no encontrado`);
    }

    return category;
  }

  async updateById(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const updatedCategory = await this.categoryModel.findByIdAndUpdate(
      id,
      updateCategoryDto,
      { new: true },
    );

    if (!updatedCategory) {
      throw new NotFoundException(`Category con ${id} no encontrado`);
    }

    return updatedCategory;
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoryModel.create(createCategoryDto);
  }

  async delete(id: string): Promise<Category> {
    const category = await this.categoryModel.findByIdAndDelete(id);
    if (!category) {
      throw new NotFoundException(`Category con ID ${id} no encontrado`);
    }
    return category;
  }
}
