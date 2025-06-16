import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company, CompanyDocument } from './schema/company.schema';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  //Management area
  async findAllManagement(): Promise<Company[]> {
    const companies = await this.companyModel.find();
    return companies;
  }

  async findByIdManagement(id: string): Promise<Company> {
    const company = await this.companyModel.findById(id);

    if (!company) {
      throw new NotFoundException(`Company con id ${id} no encontrado`);
    }

    return company;
  }

  async updateById(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    const updatedCompany = await this.companyModel.findByIdAndUpdate(
      id,
      updateCompanyDto,
      { new: true },
    );

    if (!updatedCompany) {
      throw new NotFoundException(`Company con ${id} no encontrado`);
    }

    return updatedCompany;
  }
}
