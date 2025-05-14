import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Risk, RiskDocument } from './schema/risk.schema';
import { CreateRiskDto } from './dto/create-risk.dto';
import { UpdateRiskDto } from './dto/update-risk.dto';
import { PaginationDto } from '@common/dto/pagination.dto';
import { PaginationManagementSearchRiskDto } from './dto/pagination-management-search-risk.dto';
import { PaginationSearchRiskDto } from './dto/pagination-search-risk.dto';

@Injectable()
export class RiskService {
  constructor(@InjectModel(Risk.name) private riskModel: Model<RiskDocument>) {}

  async findAll(paginationDto: PaginationDto): Promise<Risk[]> {
    const { limit = 5, offset = 0 } = paginationDto;

    const risks = await this.riskModel
      .find({ is_available: true })
      .select('name image')
      .limit(limit)
      .skip(offset);

    return risks;
  }

  async findAllSearch(
    paginationSearchRiskDto: PaginationSearchRiskDto,
  ): Promise<Risk[]> {
    const { limit = 5, offset = 0, name } = paginationSearchRiskDto;

    const filter: any = { is_available: true };

    if (name) filter.name = { $regex: name, $options: 'i' };

    const risks = await this.riskModel
      .find(filter)
      .select('-is_available')
      .limit(limit)
      .skip(offset);

    return risks;
  }

  async findAllManagementSearch(
    paginationManagementSearchRiskDto: PaginationManagementSearchRiskDto,
  ): Promise<Risk[]> {
    const {
      limit = 5,
      offset = 0,
      name,
      is_available = 'all',
    } = paginationManagementSearchRiskDto;

    const filter: any = {};

    if (name) filter.name = { $regex: name, $options: 'i' };

    if (is_available && is_available !== 'all') {
      filter.is_available = is_available === 'true';
    }

    const risks = await this.riskModel.find(filter).limit(limit).skip(offset);

    return risks;
  }

  async findById(id: string): Promise<Risk> {
    const risk = await this.riskModel
      .findOne({ _id: id, is_available: true })
      .select('-is_available');

    if (!risk) {
      throw new NotFoundException(`Risk con id ${id} no encontrado`);
    }

    return risk;
  }

  async findByIdManagement(id: string): Promise<Risk> {
    const risk = await this.riskModel.findById(id);

    if (!risk) {
      throw new NotFoundException(`Risk con id ${id} no encontrado`);
    }

    return risk;
  }

  async updateById(id: string, updateRiskDto: UpdateRiskDto): Promise<Risk> {
    const updatedRisk = await this.riskModel.findByIdAndUpdate(
      id,
      UpdateRiskDto,
      { new: true },
    );

    if (!updatedRisk) {
      throw new NotFoundException(`Risk con ${id} no encontrado`);
    }

    return updatedRisk;
  }

  async create(createRiskDto: CreateRiskDto): Promise<Risk> {
    return await this.riskModel.create(createRiskDto);
  }

  async delete(id: string): Promise<Risk> {
    const risk = await this.riskModel.findByIdAndDelete(id);
    if (!risk) {
      throw new NotFoundException(`Risk con ID ${id} no encontrado`);
    }
    return risk;
  }
}
