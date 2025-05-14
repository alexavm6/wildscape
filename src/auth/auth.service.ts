import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { UserService } from '@user/user.service';
import { Model, Types } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import {
  Administrator,
  AdministratorDocument,
} from '@administrator/schema/administrator.schema';
import { Employee, EmployeeDocument } from '@employee/schema/employee.schema';
import { User, UserDocument } from '@user/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Administrator.name)
    private administratorModel: Model<AdministratorDocument>,
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;

    let user: any;
    let role: string = '';
    let campus: any;

    // Buscar admin
    const admin = await this.administratorModel.findOne({ email }).exec();
    if (admin) {
      // Si encuentra el admin, verifica la contraseña
      if (await bcrypt.compare(password, admin.password)) {
        user = admin;
        role = 'administrator';
      } else {
        // Si la contraseña es incorrecta, devuelve error inmediatamente
        throw new UnauthorizedException('Credenciales inválidas');
      }
    }

    // Si no encontró admin, busca employee
    if (!user) {
      const employee = await this.employeeModel.findOne({ email }).exec();
      if (employee) {
        // Si encuentra employee, verifica contraseña
        if (await bcrypt.compare(password, employee.password)) {
          user = employee;
          role = employee.role;
          campus = employee.campus_id;
        } else {
          // Si la contraseña es incorrecta, devuelve error inmediatamente
          throw new UnauthorizedException('Credenciales inválidas');
        }
      }
    }

    // Si no encontró admin ni employee, busca usuario regular
    if (!user) {
      const regularUser = await this.userModel.findOne({ email }).exec();
      if (regularUser) {
        // Si encuentra usuario regular, verifica contraseña
        if (await bcrypt.compare(password, regularUser.password)) {
          user = regularUser;
          role = 'user';
        } else {
          // Si la contraseña es incorrecta, devuelve error inmediatamente
          throw new UnauthorizedException('Credenciales inválidas');
        }
      }
    }

    // Si no encontró ningún usuario con ese email
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Crear JWT payload
    const payload = {
      uid: user._id,
      role: role,
    };

    // Generar token
    return {
      user: {
        id: user._id,
        names: user.names,
        last_names: user.last_names,
        dni: user.dni,
        image: user.image,
        email: user.email,
        telephone: user.telephone,
        campus: campus,
        role: role,
      },
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(createUserDto: CreateUserDto): Promise<any> {
    const { names, email, password } = createUserDto;

    const userExists = await this.userService.findByEmail(email);
    if (userExists) throw new ConflictException('El email ya está registrado');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = (await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    })) as UserDocument;

    return {
      id: user._id,
      names: user.names,
      last_names: user.last_names,
      dni: user.dni,
      image: user.image,
      email: user.email,
      telephone: user.telephone,
      role: 'user',
    };
  }
}
