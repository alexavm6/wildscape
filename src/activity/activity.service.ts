import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity, ActivityDocument } from '@activity/schema/activity.schema';
import { PaginationDto } from '@common/dto/pagination.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationSearchActivityDto } from './dto/pagination-search-activity.dto';
import { PaginationManagementSearchActivityDto } from './dto/pagination-management-search-activity.dto';

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel(Activity.name) private activityModel: Model<ActivityDocument>,
  ) {}

  async findAll(paginationDto: PaginationDto): Promise<Activity[]> {
    const { limit = 5, offset = 0 } = paginationDto;

    const activities = await this.activityModel
      .find({ is_available: true })
      .select('name image')
      .limit(limit)
      .skip(offset);

    return activities;
  }

  async findAllSearch(
    paginationSearchActivityDto: PaginationSearchActivityDto,
  ): Promise<Activity[]> {
    const { limit = 5, offset = 0, name } = paginationSearchActivityDto;

    const filter: any = { is_available: true };

    if (name) filter.name = { $regex: name, $options: 'i' };

    const activities = await this.activityModel
      .find(filter)
      .select('-is_available')
      .limit(limit)
      .skip(offset);

    return activities;
  }

  async findAllManagementSearch(
    paginationManagementSearchActivityDto: PaginationManagementSearchActivityDto,
  ): Promise<Activity[]> {
    const {
      limit = 5,
      offset = 0,
      name,
      is_available = 'all',
    } = paginationManagementSearchActivityDto;

    const filter: any = {};

    if (name) filter.name = { $regex: name, $options: 'i' };

    if (is_available && is_available !== 'all') {
      filter.is_available = is_available === 'true';
    }

    const activities = await this.activityModel
      .find(filter)
      .limit(limit)
      .skip(offset);

    return activities;
  }

  async findById(id: string): Promise<Activity> {
    const activity = await this.activityModel
      .findOne({ _id: id, is_available: true })
      .select('-is_available');

    if (!activity) {
      throw new NotFoundException(`Activity con id ${id} no encontrado`);
    }

    return activity;
  }

  async findByIdManagement(id: string): Promise<Activity> {
    const activity = await this.activityModel.findById(id);

    if (!activity) {
      throw new NotFoundException(`Activity con id ${id} no encontrado`);
    }

    return activity;
  }

  async updateById(
    id: string,
    updateActivityDto: UpdateActivityDto,
  ): Promise<Activity> {
    const updatedActivity = await this.activityModel.findByIdAndUpdate(
      id,
      updateActivityDto,
      { new: true },
    );

    if (!updatedActivity) {
      throw new NotFoundException(`Activity con ${id} no encontrado`);
    }

    return updatedActivity;
  }

  async create(createActivityDto: CreateActivityDto): Promise<Activity> {
    return await this.activityModel.create(createActivityDto);
  }

  async delete(id: string): Promise<Activity> {
    const activity = await this.activityModel.findByIdAndDelete(id);
    if (!activity) {
      throw new NotFoundException(`Activity con ID ${id} no encontrado`);
    }
    return activity;
  }
}
