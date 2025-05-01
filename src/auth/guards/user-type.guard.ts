import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { USER_TYPES_KEY } from '../decorators/user-type.decorator';

@Injectable()
export class UserTypesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredUserType = this.reflector.getAllAndOverride<string[]>(
      USER_TYPES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredUserType) return true;

    const { user } = context.switchToHttp().getRequest();

    if (requiredUserType.includes(user.type)) {
      return true;
    } else {
      throw new UnauthorizedException('Tipo de usuario no autorizado');
    }
  }
}
