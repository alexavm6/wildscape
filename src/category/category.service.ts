import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './schema/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  // create(createCategoryDto: CreateCategoryDto) {
  //   return 'This action adds a new category';
  // }

  async findAll(): Promise<Category[]> {
    return await this.categoryModel.find({ delete_state: true });
  }

  async findById(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id);
    if (category) {
      if (category.delete_state === false) {
        throw new NotFoundException(`Category con id ${id} no encontrado`);
      }
    } else {
      throw new NotFoundException(`Category con id ${id} no encontrado`);
    }

    return category;
  }

  // update(id: number, updateCategoryDto: UpdateCategoryDto) {
  //   return `This action updates a #${id} category`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} category`;
  // }
}
