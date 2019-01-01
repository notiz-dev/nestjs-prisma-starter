import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler())
            .map(role => role.toUpperCase());
        if (!roles) {
            return true;
        }

        const request = this.getRequest(context);
        const user = request.user;

        const hasRole = () => !!roles.find((item) => item === user.role);
        return user && user.role && hasRole();

        // use this if user has multiple roles
        // const hasRole = () => user.roles.some((role) => roles.includes(role));
        // return user && user.roles && hasRole();
    }

}