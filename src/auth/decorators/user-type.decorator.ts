import { SetMetadata } from '@nestjs/common';

export const USER_TYPE_KEY = 'userTypes';
export const UserType = (...types: string[]) =>
  SetMetadata(USER_TYPE_KEY, types);
