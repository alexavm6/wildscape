// src/common/pipes/parse-mongo-id.pipe.ts
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string) {
    if (!isValidObjectId(value)) {
      throw new BadRequestException(
        `El ID ${value} no es un MongoDB ObjectId válido`,
      );
    }
    return value;
  }
}
