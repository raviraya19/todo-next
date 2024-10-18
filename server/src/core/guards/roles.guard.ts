import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { Role } from '@prisma/client'
import { ROLES_KEY } from '../decorators/role.decorator'
import { Reflector } from '@nestjs/core'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchRoles = (roles, userRoles) => {
    return roles.some((role) => role === userRoles)
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (!requiredRoles) {
      return true
    }
    const { user } = context.switchToHttp().getRequest()
    const checkRole = this.matchRoles(requiredRoles, user.userRole)
    if (!checkRole) {
      throw new ForbiddenException('Insufficient permissions')
    }
    return true
  }
}
