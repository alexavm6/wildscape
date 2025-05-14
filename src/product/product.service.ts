import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schema/product.schema';
import { CategoryService } from '@category/category.service';
import { PaginationSimpleDto } from '@common/dto/pagination-simple.dto';
import { PaginationDto } from '@common/dto/pagination.dto';
import { PaginationSimpleSearchProductDto } from './dto/pagination-simple-search-product.dto';
import { PaginationManagementSearchProductDto } from './dto/pagination-management-search-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private categoryService: CategoryService,
  ) {}

  async findAll(paginationDto: PaginationDto): Promise<Product[]> {
    const { limit = 5, offset = 0 } = paginationDto;

    const products = await this.productModel
      .find({ is_available: true })
      .select('name description price')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(offset);

    return products;
  }

  async findAllSearch(
    paginationSimpleSearchProductDto: PaginationSimpleSearchProductDto,
  ): Promise<Product[]> {
    const {
      limit = 5,
      offset = 0,
      simple = 'false',
      name,
      description,
      activity_id,
      category_id,
      risk_id,
      campus_id,
      capacity,
      min_capacity,
      max_capacity,
      displacement_duration,
      min_displacement_duration,
      max_displacement_duration,
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
      activity_address,
      meeting_department_id,
      meeting_province_id,
      meeting_district_id,
      meeting_city_id,
      meeting_address,
    } = paginationSimpleSearchProductDto;

    const filter: any = { is_available: true };

    if (name) filter.name = { $regex: name, $options: 'i' };
    if (description)
      filter.description = { $regex: description, $options: 'i' };
    if (activity_address)
      filter.activity_address = { $regex: activity_address, $options: 'i' };
    if (meeting_address)
      filter.meeting_address = { $regex: meeting_address, $options: 'i' };

    if (activity_id) filter.activity_id = activity_id;
    if (category_id) filter.category_id = category_id;
    if (risk_id) filter.risk_id = risk_id;
    if (campus_id) filter.campus_id = campus_id;

    if (activity_department_id)
      filter.activity_department_id = activity_department_id;
    if (activity_province_id)
      filter.activity_province_id = activity_province_id;
    if (activity_district_id)
      filter.activity_district_id = activity_district_id;
    if (activity_city_id) filter.activity_city_id = activity_city_id;

    if (meeting_department_id)
      filter.meeting_department_id = meeting_department_id;
    if (meeting_province_id) filter.meeting_province_id = meeting_province_id;
    if (meeting_district_id) filter.meeting_district_id = meeting_district_id;
    if (meeting_city_id) filter.meeting_city_id = meeting_city_id;

    if (capacity) filter.capacity = capacity;
    if (min_capacity !== undefined && max_capacity !== undefined) {
      filter.capacity = { $gte: min_capacity, $lte: max_capacity };
    } else if (min_capacity !== undefined) {
      filter.capacity = { $gte: min_capacity };
    } else if (max_capacity !== undefined) {
      filter.capacity = { $lte: max_capacity };
    }

    if (displacement_duration)
      filter.displacement_duration = displacement_duration;
    if (
      min_displacement_duration !== undefined &&
      max_displacement_duration !== undefined
    ) {
      filter.displacement_duration = {
        $gte: min_displacement_duration,
        $lte: max_displacement_duration,
      };
    } else if (min_displacement_duration !== undefined) {
      filter.displacement_duration = { $gte: min_displacement_duration };
    } else if (max_displacement_duration !== undefined) {
      filter.displacement_duration = { $lte: max_displacement_duration };
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

    if (price) filter.price = price;
    if (min_price !== undefined && max_price !== undefined) {
      filter.price = { $gte: min_price, $lte: max_price };
    } else if (min_price !== undefined) {
      filter.price = { $gte: min_price };
    } else if (max_price !== undefined) {
      filter.price = { $lte: max_price };
    }

    const isSimple = simple === 'true';

    if (isSimple) {
      const events = await this.productModel
        .find(filter)
        .select('name description price')
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(offset);

      return events;
    }

    const products = await this.productModel
      .find(filter)
      .sort({ createdAt: -1 })
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
      })
      .populate({
        path: 'meeting_department_id',
        model: 'Department',
        select: 'name -_id',
      })
      .populate({
        path: 'meeting_province_id',
        model: 'Province',
        select: 'name -_id',
      })
      .populate({
        path: 'meeting_district_id',
        model: 'District',
        select: 'name -_id',
      })
      .populate({
        path: 'meeting_city_id',
        model: 'City',
        select: 'name -_id',
      })
      .limit(limit)
      .skip(offset);

    return products;
  }

  async findAllManagementSearch(
    paginationManagementSearchProductDto: PaginationManagementSearchProductDto,
  ): Promise<Product[]> {
    const {
      limit = 5,
      offset = 0,
      name,
      description,
      activity_id,
      category_id,
      risk_id,
      campus_id,
      capacity,
      min_capacity,
      max_capacity,
      displacement_duration,
      min_displacement_duration,
      max_displacement_duration,
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
      activity_address,
      meeting_department_id,
      meeting_province_id,
      meeting_district_id,
      meeting_city_id,
      meeting_address,
      is_available = 'all',
    } = paginationManagementSearchProductDto;

    const filter: any = {};

    if (name) filter.name = { $regex: name, $options: 'i' };
    if (description)
      filter.description = { $regex: description, $options: 'i' };
    if (activity_address)
      filter.activity_address = { $regex: activity_address, $options: 'i' };
    if (meeting_address)
      filter.meeting_address = { $regex: meeting_address, $options: 'i' };

    if (activity_id) filter.activity_id = activity_id;
    if (category_id) filter.category_id = category_id;
    if (risk_id) filter.risk_id = risk_id;
    if (campus_id) filter.campus_id = campus_id;

    if (activity_department_id)
      filter.activity_department_id = activity_department_id;
    if (activity_province_id)
      filter.activity_province_id = activity_province_id;
    if (activity_district_id)
      filter.activity_district_id = activity_district_id;
    if (activity_city_id) filter.activity_city_id = activity_city_id;

    if (meeting_department_id)
      filter.meeting_department_id = meeting_department_id;
    if (meeting_province_id) filter.meeting_province_id = meeting_province_id;
    if (meeting_district_id) filter.meeting_district_id = meeting_district_id;
    if (meeting_city_id) filter.meeting_city_id = meeting_city_id;

    if (capacity) filter.capacity = capacity;
    if (min_capacity !== undefined && max_capacity !== undefined) {
      filter.capacity = { $gte: min_capacity, $lte: max_capacity };
    } else if (min_capacity !== undefined) {
      filter.capacity = { $gte: min_capacity };
    } else if (max_capacity !== undefined) {
      filter.capacity = { $lte: max_capacity };
    }

    if (displacement_duration)
      filter.displacement_duration = displacement_duration;
    if (
      min_displacement_duration !== undefined &&
      max_displacement_duration !== undefined
    ) {
      filter.displacement_duration = {
        $gte: min_displacement_duration,
        $lte: max_displacement_duration,
      };
    } else if (min_displacement_duration !== undefined) {
      filter.displacement_duration = { $gte: min_displacement_duration };
    } else if (max_displacement_duration !== undefined) {
      filter.displacement_duration = { $lte: max_displacement_duration };
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

    if (price) filter.price = price;
    if (min_price !== undefined && max_price !== undefined) {
      filter.price = { $gte: min_price, $lte: max_price };
    } else if (min_price !== undefined) {
      filter.price = { $gte: min_price };
    } else if (max_price !== undefined) {
      filter.price = { $lte: max_price };
    }

    if (is_available && is_available !== 'all') {
      filter.is_available = is_available === 'true';
    }

    const products = await this.productModel
      .find(filter)
      .sort({ createdAt: -1 })
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
      .populate({
        path: 'meeting_department_id',
        model: 'Department',
        select: 'name -_id',
      })
      .populate({
        path: 'meeting_province_id',
        model: 'Province',
        select: 'name -_id',
      })
      .populate({
        path: 'meeting_district_id',
        model: 'District',
        select: 'name -_id',
      })
      .populate({
        path: 'meeting_city_id',
        model: 'City',
        select: 'name -_id',
      })
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
      })
      .populate({
        path: 'meeting_department_id',
        model: 'Department',
        select: 'name -_id',
      })
      .populate({
        path: 'meeting_province_id',
        model: 'Province',
        select: 'name -_id',
      })
      .populate({
        path: 'meeting_district_id',
        model: 'District',
        select: 'name -_id',
      })
      .populate({
        path: 'meeting_city_id',
        model: 'City',
        select: 'name -_id',
      });

    if (!product) {
      throw new NotFoundException(`Evento con id ${id} no encontrado`);
    }

    return product;
  }

  async findByIdManagement(id: string): Promise<Product> {
    const event = await this.productModel
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
      })
      .populate({
        path: 'meeting_department_id',
        model: 'Department',
        select: 'name -_id',
      })
      .populate({
        path: 'meeting_province_id',
        model: 'Province',
        select: 'name -_id',
      })
      .populate({
        path: 'meeting_district_id',
        model: 'District',
        select: 'name -_id',
      })
      .populate({
        path: 'meeting_city_id',
        model: 'City',
        select: 'name -_id',
      });

    if (!event) {
      throw new NotFoundException(`Evento con id ${id} no encontrado`);
    }

    return event;
  }

  async updateById(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
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
      .populate({
        path: 'meeting_department_id',
        model: 'Department',
        select: 'name -_id',
      })
      .populate({
        path: 'meeting_province_id',
        model: 'Province',
        select: 'name -_id',
      })
      .populate({
        path: 'meeting_district_id',
        model: 'District',
        select: 'name -_id',
      })
      .populate({
        path: 'meeting_city_id',
        model: 'City',
        select: 'name -_id',
      });

    if (!updatedProduct) {
      throw new NotFoundException(`Evento con ${id} no encontrado`);
    }

    return updatedProduct;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = await this.productModel.create(createProductDto);

    const populatedProduct = await this.productModel
      .findById(createdProduct._id)
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
      .populate({
        path: 'meeting_department_id',
        model: 'Department',
        select: 'name -_id',
      })
      .populate({
        path: 'meeting_province_id',
        model: 'Province',
        select: 'name -_id',
      })
      .populate({
        path: 'meeting_district_id',
        model: 'District',
        select: 'name -_id',
      })
      .populate({
        path: 'meeting_city_id',
        model: 'City',
        select: 'name -_id',
      });

    if (!populatedProduct) {
      throw new NotFoundException(`Error al poblar el evento recién creado`);
    }

    return populatedProduct;
  }

  async delete(id: string): Promise<Product> {
    const producto = await this.productModel.findByIdAndDelete(id);
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return producto;
  }
}
