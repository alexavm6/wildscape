import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './schema/category.schema';
import { PaginationDto } from '@common/dto/pagination.dto';
import { PaginationManagementSearchCategoryDto } from './dto/pagination-management-search-category.dto';
import { PaginationSearchCategoryDto } from './dto/pagination-search-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async findAll(paginationDto: PaginationDto): Promise<Category[]> {
    const { limit = 5, offset = 0 } = paginationDto;

    const categories = await this.categoryModel
      .find({ is_available: true })
      .select('name image')
      .limit(limit)
      .skip(offset);

    return categories;
  }

  async findAllSearch(
    paginationSearchCategoryDto: PaginationSearchCategoryDto,
  ): Promise<Category[]> {
    const { limit = 5, offset = 0, name } = paginationSearchCategoryDto;

    const filter: any = { is_available: true };

    if (name) filter.name = { $regex: name, $options: 'i' };

    const categories = await this.categoryModel
      .find(filter)
      .select('-is_available')
      .limit(limit)
      .skip(offset);

    return categories;
  }

  async findAllManagementSearch(
    paginationManagementSearchCategoryDto: PaginationManagementSearchCategoryDto,
  ): Promise<Category[]> {
    const {
      limit = 5,
      offset = 0,
      name,
      is_available = 'all',
    } = paginationManagementSearchCategoryDto;

    const filter: any = {};

    if (name) filter.name = { $regex: name, $options: 'i' };

    if (is_available && is_available !== 'all') {
      filter.is_available = is_available === 'true';
    }

    const categories = await this.categoryModel
      .find(filter)
      .limit(limit)
      .skip(offset);

    return categories;
  }

  async findById(id: string): Promise<Category> {
    const category = await this.categoryModel
      .findOne({ _id: id, is_available: true })
      .select('-is_available');

    if (!category) {
      throw new NotFoundException(`Category con id ${id} no encontrado`);
    }

    return category;
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
      UpdateCategoryDto,
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
