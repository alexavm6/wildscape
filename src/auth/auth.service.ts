import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import {
  Administrator,
  AdministratorDocument,
} from '../administrator/schema/administrator.schema';
import { Employee, EmployeeDocument } from '../employee/schema/employee.schema';
import { User, UserDocument } from '../user/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Administrator.name)
    private administratorModel: Model<AdministratorDocument>,
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;

    let user: any;
    let type: string = '';
    let role: string = '';

    // Buscar en todos los modelos
    const admin = await this.administratorModel.findOne({ email }).exec();
    if (admin && (await bcrypt.compare(password, admin.password))) {
      user = admin;
      role = 'administrator_role';
      type = 'administrator';
    }

    if (!user) {
      const employee = await this.employeeModel.findOne({ email }).exec();
      if (employee && (await bcrypt.compare(password, employee.password))) {
        user = employee;
        role = employee.role;
        type = 'employee';
      }
    }

    if (!user) {
      const regularUser = await this.userModel.findOne({ email }).exec();
      if (
        regularUser &&
        (await bcrypt.compare(password, regularUser.password))
      ) {
        user = regularUser;
        role = 'user_role';
        type = 'user';
      }
    }

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Crear JWT payload
    const payload = {
      uid: user._id,
      role: role,
      type: type,
    };

    // Generar token
    return {
      user: {
        id: user._id,
        names: user.names,
        last_names: user.last_names,
        dni: user.dni,
        email: user.email,
        telephone: user.telephone,
        address: user.address,
        role: role,
        type: type,
      },
      access_token: this.jwtService.sign(payload),
    };
  }
}
