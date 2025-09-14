import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enum/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // no roles required
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.role) {
      throw new ForbiddenException('Access denied: No role found');
    }

    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException(`Access denied for role: ${user.role}`);
    }

    return true;
  }
}


import { SetMetadata } from '@nestjs/common';
// import { Role } from '../enum/role.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
