import { PartialType } from '@nestjs/swagger';
import { CreatePromotionProductDto } from './create-promotion-product.dto';

export class UpdatePromotionProductDto extends PartialType(CreatePromotionProductDto) {}
