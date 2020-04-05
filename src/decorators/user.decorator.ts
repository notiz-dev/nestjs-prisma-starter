import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../models/user';

export function getUser(ctx): User {
  const request = ctx.switchToHttp().getNext().req;
  return request.user;
}

export const UserEntity = createParamDecorator(
  (data, ctx: ExecutionContext) => getUser(ctx)
);
