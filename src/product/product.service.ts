import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schema/product.schema';
import { Sale, SaleDocument } from '@sale/schema/sale.schema';
import {
  SaleDetail,
  SaleDetailDocument,
} from '@sale-detail/schema/sale-detail.schema';
import { PaginationDto } from '@common/dto/pagination.dto';
import { PaginationSearchProductDto } from './dto/pagination-search-product.dto';
import { PaginationManagementProductDto } from './dto/pagination-management-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Sale.name) private saleModel: Model<SaleDocument>,
    @InjectModel(SaleDetail.name)
    private saleDetailModel: Model<SaleDetailDocument>,
  ) {}

  /*sin role*/
  async findAll(paginationDto: PaginationDto): Promise<Product[]> {
    const { limit = 3, offset = 0 } = paginationDto;

    const products = await this.productModel
      .find({ is_available: true, registration_availability: true })
      .select(
        'name description price image activity_day activity_time registration_availability',
      )
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(offset);

    return products;
  }

  async findAllFilter(name?: string): Promise<Product[]> {
    const filter: any = { is_available: true, registration_availability: true };
    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }
    const products = await this.productModel
      .find(filter)
      .select('name')
      .sort({ name: 1 })
      .limit(5);

    return products;
  }

  async findAllSearch(
    paginationSearchProductDto: PaginationSearchProductDto,
  ): Promise<Product[]> {
    const {
      limit = 9,
      offset = 0,
      name,
      activity_id,
      category_id,
      risk_id,
      capacity,
      min_capacity,
      max_capacity,
      price,
      min_price,
      max_price,
      activity_duration,
      min_activity_duration,
      max_activity_duration,
      activity_department_id,
      activity_province_id,
      activity_district_id,
      activity_city_id,
    } = paginationSearchProductDto;

    const filter: any = { is_available: true };

    if (name) filter.name = { $regex: name, $options: 'i' };

    if (activity_id) filter.activity_id = activity_id;
    if (category_id) filter.category_id = category_id;
    if (risk_id) filter.risk_id = risk_id;

    if (capacity) filter.capacity = capacity;
    if (min_capacity !== undefined && max_capacity !== undefined) {
      filter.capacity = { $gte: min_capacity, $lte: max_capacity };
    } else if (min_capacity !== undefined) {
      filter.capacity = { $gte: min_capacity };
    } else if (max_capacity !== undefined) {
      filter.capacity = { $lte: max_capacity };
    }

    if (price) filter.price = price;
    if (min_price !== undefined && max_price !== undefined) {
      filter.price = { $gte: min_price, $lte: max_price };
    } else if (min_price !== undefined) {
      filter.price = { $gte: min_price };
    } else if (max_price !== undefined) {
      filter.price = { $lte: max_price };
    }

    if (activity_duration) filter.activity_duration = activity_duration;
    if (
      min_activity_duration !== undefined &&
      max_activity_duration !== undefined
    ) {
      filter.activity_duration = {
        $gte: min_activity_duration,
        $lte: max_activity_duration,
      };
    } else if (min_activity_duration !== undefined) {
      filter.activity_duration = { $gte: min_activity_duration };
    } else if (max_activity_duration !== undefined) {
      filter.activity_duration = { $lte: max_activity_duration };
    }

    if (activity_department_id)
      filter.activity_department_id = activity_department_id;
    if (activity_province_id)
      filter.activity_province_id = activity_province_id;
    if (activity_district_id)
      filter.activity_district_id = activity_district_id;
    if (activity_city_id) filter.activity_city_id = activity_city_id;

    const products = await this.productModel
      .find(filter)
      .select(
        'name description price image activity_day activity_time registration_availability',
      )
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(offset);

    return products;
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productModel
      .findOne({ _id: id, is_available: true })
      .select('-is_available')
      .populate({
        path: 'activity_id',
        model: 'Activity',
        select: 'name -_id',
      })
      .populate({
        path: 'category_id',
        model: 'Category',
        select: 'name -_id',
      })
      .populate({
        path: 'risk_id',
        model: 'Risk',
        select: 'name -_id',
      })
      .populate({
        path: 'campus_id',
        model: 'Campus',
        select: 'name -_id',
      })
      .populate({
        path: 'activity_department_id',
        model: 'Department',
        select: 'name -_id',
      })
      .populate({
        path: 'activity_province_id',
        model: 'Province',
        select: 'name -_id',
      })
      .populate({
        path: 'activity_district_id',
        model: 'District',
        select: 'name -_id',
      })
      .populate({
        path: 'activity_city_id',
        model: 'City',
        select: 'name -_id',
      });

    if (!product) {
      throw new NotFoundException(`Evento con id ${id} no encontrado`);
    }

    return product;
  }

  /*user logeado */
  async findByUserId(
    user: { uid: string },
    paginationDto: PaginationDto,
  ): Promise<Product[]> {
    const { limit = 9, offset = 0 } = paginationDto;

    const sales = await this.saleModel
      .find({ user_id: user.uid })
      .select('_id');

    const saleIds = sales.map((sale) => sale._id);

    if (saleIds.length === 0) return [];

    const saleDetails = await this.saleDetailModel
      .find({
        sale_id: { $in: saleIds },
      })
      .select('product_id');

    const productIds = saleDetails.map((detail) => detail.product_id);

    if (productIds.length === 0) return [];

    const foundProducts = await this.productModel
      .find({
        _id: { $in: productIds },
      })
      .limit(limit)
      .skip(offset)
      .populate({
        path: 'activity_id',
        model: 'Activity',
        select: 'name -_id',
      })
      .populate({
        path: 'category_id',
        model: 'Category',
        select: 'name -_id',
      })
      .populate({
        path: 'risk_id',
        model: 'Risk',
        select: 'name -_id',
      })
      .populate({
        path: 'campus_id',
        model: 'Campus',
        select: 'name -_id',
      })
      .populate({
        path: 'activity_department_id',
        model: 'Department',
        select: 'name -_id',
      })
      .populate({
        path: 'activity_province_id',
        model: 'Province',
        select: 'name -_id',
      })
      .populate({
        path: 'activity_district_id',
        model: 'District',
        select: 'name -_id',
      })
      .populate({
        path: 'activity_city_id',
        model: 'City',
        select: 'name -_id',
      });

    return foundProducts;
  }

  //Management area
  async findAllManagementFilter(name?: string): Promise<Product[]> {
    const filter: any = {};
    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }
    const activities = await this.productModel
      .find(filter)
      .select('name')
      .sort({ name: 1 })
      .limit(5);

    return activities;
  }

  async findAllManagement(
    paginationManagementProductDto: PaginationManagementProductDto,
  ): Promise<Product[]> {
    const {
      limit = 10,
      offset = 0,
      name,
      is_available = 'all',
      registration_availability = 'all',
      activity_id,
      category_id,
      risk_id,
      capacity,
      min_capacity,
      max_capacity,
      price,
      min_price,
      max_price,
      activity_duration,
      min_activity_duration,
      max_activity_duration,
      activity_department_id,
      activity_province_id,
      activity_district_id,
      activity_city_id,
    } = paginationManagementProductDto;

    const filter: any = {};

    if (name) filter.name = { $regex: name, $options: 'i' };

    if (is_available && is_available !== 'all') {
      filter.is_available = is_available === 'true';
    }

    if (registration_availability && registration_availability !== 'all') {
      filter.registration_availability = registration_availability === 'true';
    }

    if (activity_id) filter.activity_id = activity_id;
    if (category_id) filter.category_id = category_id;
    if (risk_id) filter.risk_id = risk_id;

    if (capacity) filter.capacity = capacity;
    if (min_capacity !== undefined && max_capacity !== undefined) {
      filter.capacity = { $gte: min_capacity, $lte: max_capacity };
    } else if (min_capacity !== undefined) {
      filter.capacity = { $gte: min_capacity };
    } else if (max_capacity !== undefined) {
      filter.capacity = { $lte: max_capacity };
    }

    if (price) filter.price = price;
    if (min_price !== undefined && max_price !== undefined) {
      filter.price = { $gte: min_price, $lte: max_price };
    } else if (min_price !== undefined) {
      filter.price = { $gte: min_price };
    } else if (max_price !== undefined) {
      filter.price = { $lte: max_price };
    }

    if (activity_duration) filter.activity_duration = activity_duration;
    if (
      min_activity_duration !== undefined &&
      max_activity_duration !== undefined
    ) {
      filter.activity_duration = {
        $gte: min_activity_duration,
        $lte: max_activity_duration,
      };
    } else if (min_activity_duration !== undefined) {
      filter.activity_duration = { $gte: min_activity_duration };
    } else if (max_activity_duration !== undefined) {
      filter.activity_duration = { $lte: max_activity_duration };
    }

    if (activity_department_id)
      filter.activity_department_id = activity_department_id;
    if (activity_province_id)
      filter.activity_province_id = activity_province_id;
    if (activity_district_id)
      filter.activity_district_id = activity_district_id;
    if (activity_city_id) filter.activity_city_id = activity_city_id;

    const products = await this.productModel
      .find(filter)
      .populate({
        path: 'activity_id',
        model: 'Activity',
        select: 'name -_id',
      })
      .populate({
        path: 'category_id',
        model: 'Category',
        select: 'name -_id',
      })
      .populate({
        path: 'risk_id',
        model: 'Risk',
        select: 'name -_id',
      })
      .populate({
        path: 'campus_id',
        model: 'Campus',
        select: 'name -_id',
      })
      .populate({
        path: 'activity_department_id',
        model: 'Department',
        select: 'name -_id',
      })
      .populate({
        path: 'activity_province_id',
        model: 'Province',
        select: 'name -_id',
      })
      .populate({
        path: 'activity_district_id',
        model: 'District',
        select: 'name -_id',
      })
      .populate({
        path: 'activity_city_id',
        model: 'City',
        select: 'name -_id',
      })
      .sort({ name: 1 })
      .limit(limit)
      .skip(offset);

    return products;
  }

  async findByIdManagement(id: string): Promise<Product> {
    const product = await this.productModel
      .findById(id)
      .populate({
        path: 'activity_id',
        model: 'Activity',
        select: 'name -_id',
      })
      .populate({
        path: 'category_id',
        model: 'Category',
        select: 'name -_id',
      })
      .populate({
        path: 'risk_id',
        model: 'Risk',
        select: 'name -_id',
      })
      .populate({
        path: 'campus_id',
        model: 'Campus',
        select: 'name -_id',
      })
      .populate({
        path: 'activity_department_id',
        model: 'Department',
        select: 'name -_id',
      })
      .populate({
        path: 'activity_province_id',
        model: 'Province',
        select: 'name -_id',
      })
      .populate({
        path: 'activity_district_id',
        model: 'District',
        select: 'name -_id',
      })
      .populate({
        path: 'activity_city_id',
        model: 'City',
        select: 'name -_id',
      });

    if (!product) {
      throw new NotFoundException(`Product con id ${id} no encontrado`);
    }

    return product;
  }

  async updateById(
    id: string,
    updatedProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updatedProductDto, { new: true })
      .populate({
        path: 'activity_id',
        model: 'Activity',
        select: 'name -_id',
      })
      .populate({
        path: 'category_id',
        model: 'Category',
        select: 'name -_id',
      })
      .populate({
        path: 'risk_id',
        model: 'Risk',
        select: 'name -_id',
      })
      .populate({
        path: 'campus_id',
        model: 'Campus',
        select: 'name -_id',
      })
      .populate({
        path: 'activity_department_id',
        model: 'Department',
        select: 'name -_id',
      })
      .populate({
        path: 'activity_province_id',
        model: 'Province',
        select: 'name -_id',
      })
      .populate({
        path: 'activity_district_id',
        model: 'District',
        select: 'name -_id',
      })
      .populate({
        path: 'activity_city_id',
        model: 'City',
        select: 'name -_id',
      });

    if (!updatedProduct) {
      throw new NotFoundException(`Product con ${id} no encontrado`);
    }

    return updatedProduct;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = await this.productModel.create(createProductDto);

    const populatedProduct = await this.productModel
      .findById(product._id)
      .populate({
        path: 'activity_id',
        model: 'Activity',
        select: 'name -_id',
      })
      .populate({
        path: 'category_id',
        model: 'Category',
        select: 'name -_id',
      })
      .populate({
        path: 'risk_id',
        model: 'Risk',
        select: 'name -_id',
      })
      .populate({
        path: 'campus_id',
        model: 'Campus',
        select: 'name -_id',
      })
      .populate({
        path: 'activity_department_id',
        model: 'Department',
        select: 'name -_id',
      })
      .populate({
        path: 'activity_province_id',
        model: 'Province',
        select: 'name -_id',
      })
      .populate({
        path: 'activity_district_id',
        model: 'District',
        select: 'name -_id',
      })
      .populate({
        path: 'activity_city_id',
        model: 'City',
        select: 'name -_id',
      });

    if (!populatedProduct) {
      throw new NotFoundException(`Product no encontrado`);
    }

    return populatedProduct;
  }

  async delete(id: string): Promise<Product> {
    const product = await this.productModel
      .findById(id)
      .populate({
        path: 'activity_id',
        model: 'Activity',
        select: 'name -_id',
      })
      .populate({
        path: 'category_id',
        model: 'Category',
        select: 'name -_id',
      })
      .populate({
        path: 'risk_id',
        model: 'Risk',
        select: 'name -_id',
      })
      .populate({
        path: 'campus_id',
        model: 'Campus',
        select: 'name -_id',
      })
      .populate({
        path: 'activity_department_id',
        model: 'Department',
        select: 'name -_id',
      })
      .populate({
        path: 'activity_province_id',
        model: 'Province',
        select: 'name -_id',
      })
      .populate({
        path: 'activity_district_id',
        model: 'District',
        select: 'name -_id',
      })
      .populate({
        path: 'activity_city_id',
        model: 'City',
        select: 'name -_id',
      });

    if (!product) {
      throw new NotFoundException(`Product con ID ${id} no encontrado`);
    }

    await product.deleteOne(); // elimina el documento ya poblado
    return product;
  }
}
