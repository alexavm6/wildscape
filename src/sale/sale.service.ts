import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale, SaleDocument } from '@sale/schema/sale.schema';
import { Product, ProductDocument } from '@product/schema/product.schema';
import {
  SaleDetail,
  SaleDetailDocument,
} from '@sale-detail/schema/sale-detail.schema';
import { PaginationDto } from '@common/dto/pagination.dto';

@Injectable()
export class SaleService {
  constructor(
    @InjectModel(Sale.name) private saleModel: Model<SaleDocument>,
    @InjectModel(SaleDetail.name)
    private saleDetailModel: Model<SaleDetailDocument>,
  ) {}

  /*user logeado */
  async findByUserId(
    user: { uid: string },
    paginationDto: PaginationDto,
  ): Promise<any[]> {
    const { limit = 9, offset = 0 } = paginationDto;

    const sales = await this.saleModel
      .find({ user_id: user.uid })
      .skip(offset)
      .limit(limit);

    const salesWithDetails = await Promise.all(
      sales.map(async (sale) => {
        const saleDetails = await this.saleDetailModel
          .find({ sale_id: sale._id })
          .populate({
            path: 'product_id',
            model: 'Product',
            select: 'name',
          })
          .select('-_id -__v -sale_id');

        const { _id, __v, user_id, ...cleanSale } = sale.toObject();

        return {
          id: _id,
          ...cleanSale,
          sale_details: saleDetails,
        };
      }),
    );

    return salesWithDetails;
  }
}
