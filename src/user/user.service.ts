import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from '@user/schema/user.schema';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return await newUser.save();
  }

  async findByEmailOrDni(email: string, dni: string): Promise<User | null> {
    return await this.userModel.findOne({
      $or: [{ email }, { dni }],
    });
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async updateById(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedProduct = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
    if (!updatedProduct)
      throw new NotFoundException(`Product with ID ${id} not found`);
    return updatedProduct;
  }

  async deleteById(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException(`Product with ID ${id} not found`);
  }
}
