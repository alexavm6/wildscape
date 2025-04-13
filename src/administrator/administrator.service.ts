import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import {
  Administrator,
  AdministratorDocument,
} from './schema/administrator.schema';

@Injectable()
export class AdministratorService {
  constructor(
    @InjectModel(Administrator.name)
    private administratorModel: Model<AdministratorDocument>,
  ) {}

  async create(createAdministratorDto: CreateAdministratorDto): Promise<any> {
    // Hashear la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
      createAdministratorDto.password,
      salt,
    );

    // Crear nuevo administrator
    const newAdmin = new this.administratorModel({
      ...createAdministratorDto,
      password: hashedPassword,
    });

    const savedAdmin = await newAdmin.save();

    // Eliminar la contraseña del objeto que se devuelve
    const result = savedAdmin.toObject() as Partial<Administrator>;
    delete result.password;

    return result;
  }

  async findAll(): Promise<Partial<Administrator>[]> {
    const admins = await this.administratorModel.find().lean();

    // Eliminar las contraseñas de cada administrador
    const sanitizedAdmins = admins.map((admin) => {
      const { password, ...rest } = admin;
      return rest;
    });

    return sanitizedAdmins;
  }

  findOne(id: number) {
    return `This action returns a #${id} administrator`;
  }

  update(id: number, updateAdministratorDto: UpdateAdministratorDto) {
    return `This action updates a #${id} administrator`;
  }

  remove(id: number) {
    return `This action removes a #${id} administrator`;
  }
}
