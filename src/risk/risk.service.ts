import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Risk, RiskDocument } from './schema/risk.schema';
import { CreateRiskDto } from './dto/create-risk.dto';
import { UpdateRiskDto } from './dto/update-risk.dto';
import { PaginationManagementDto } from '@common/dto/management/pagination-management.dto';

@Injectable()
export class RiskService {
  constructor(@InjectModel(Risk.name) private riskModel: Model<RiskDocument>) {}

  //user area
  async findAllProductFilter(): Promise<Risk[]> {
    const risks = await this.riskModel
      .find({ is_available: true })
      .select('name')
      .sort({ name: 1 });

    return risks;
  }

  //Management area
  async findAllManagementFilter(name?: string): Promise<Risk[]> {
    const filter: any = {};
    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }
    const risks = await this.riskModel
      .find(filter)
      .select('name')
      .sort({ name: 1 });

    return risks;
  }

  async findAllManagement(
    paginationFindAllManagementDto: PaginationManagementDto,
  ): Promise<Risk[]> {
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

    const risks = await this.riskModel
      .find(filter)
      .sort({ name: 1 })
      .limit(limit)
      .skip(offset);
    return risks;
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
      updateRiskDto,
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
