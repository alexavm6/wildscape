import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schema/product.schema';
import { CategoryService } from '@category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private categoryService: CategoryService,
  ) {}

  // create(createProductDto: CreateProductDto) {
  //   return 'This action adds a new product';
  // }

  async findAll(): Promise<Product[]> {
    return await this.productModel
      .find({ is_available: true })
      .populate({
        path: 'activity_id',
        model: 'Activity',
      })
      .populate({
        path: 'category_id',
        model: 'Category',
      })
      .populate({
        path: 'risk_id',
        model: 'Risk',
      })
      .populate({
        path: 'campus_id',
        model: 'Campus',
      })
      .populate({
        path: 'activity_department_id',
        model: 'Department',
      })
      .populate({
        path: 'activity_province_id',
        model: 'Province',
      })
      .populate({
        path: 'activity_district_id',
        model: 'District',
      })
      .populate({
        path: 'activity_city_id',
        model: 'City',
      })
      .populate({
        path: 'meeting_department_id',
        model: 'Department',
      })
      .populate({
        path: 'meeting_province_id',
        model: 'Province',
      })
      .populate({
        path: 'meeting_district_id',
        model: 'District',
      })
      .populate({
        path: 'meeting_city_id',
        model: 'City',
      });
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productModel
      .findById(id)
      .populate({
        path: 'activity_id',
        model: 'Activity',
      })
      .populate({
        path: 'category_id',
        model: 'Category',
      })
      .populate({
        path: 'risk_id',
        model: 'Risk',
      })
      .populate({
        path: 'campus_id',
        model: 'Campus',
      })
      .populate({
        path: 'activity_department_id',
        model: 'Department',
      })
      .populate({
        path: 'activity_province_id',
        model: 'Province',
      })
      .populate({
        path: 'activity_district_id',
        model: 'District',
      })
      .populate({
        path: 'activity_city_id',
        model: 'City',
      })
      .populate({
        path: 'meeting_department_id',
        model: 'Department',
      })
      .populate({
        path: 'meeting_province_id',
        model: 'Province',
      })
      .populate({
        path: 'meeting_district_id',
        model: 'District',
      })
      .populate({
        path: 'meeting_city_id',
        model: 'City',
      });

    if (product) {
      if (product.is_available === false) {
        throw new NotFoundException(`Producto con id ${id} no encontrado`);
      }
    } else {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }

    return product;
  }

  async findByCategoryId(id: string): Promise<Product[]> {
    await this.categoryService.findById(id);
    return await this.productModel
      .find({
        is_available: true,
        category_id: id,
      })
      .populate({
        path: 'activity_id',
        model: 'Activity',
      })
      .populate({
        path: 'category_id',
        model: 'Category',
      })
      .populate({
        path: 'risk_id',
        model: 'Risk',
      })
      .populate({
        path: 'campus_id',
        model: 'Campus',
      })
      .populate({
        path: 'activity_department_id',
        model: 'Department',
      })
      .populate({
        path: 'activity_province_id',
        model: 'Province',
      })
      .populate({
        path: 'activity_district_id',
        model: 'District',
      })
      .populate({
        path: 'activity_city_id',
        model: 'City',
      })
      .populate({
        path: 'meeting_department_id',
        model: 'Department',
      })
      .populate({
        path: 'meeting_province_id',
        model: 'Province',
      })
      .populate({
        path: 'meeting_district_id',
        model: 'District',
      })
      .populate({
        path: 'meeting_city_id',
        model: 'City',
      });
  }

  //   update(id: number, updateProductDto: UpdateProductDto) {
  //     return `This action updates a #${id} product`;
  //   }

  //   remove(id: number) {
  //     return `This action removes a #${id} product`;
  //   }
  // }
}
