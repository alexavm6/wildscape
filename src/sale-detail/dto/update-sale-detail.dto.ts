import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleDetailDto } from './create-sale-detail.dto';

export class UpdateSaleDetailDto extends PartialType(CreateSaleDetailDto) {}
