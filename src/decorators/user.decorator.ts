import { createParamDecorator } from '@nestjs/common';
import { User } from '../prisma/client';

export const UserEntity = createParamDecorator(
  (data, [root, args, ctx, info]) => getUser(ctx),
);

export function getUser(ctx): User {
  return ctx.req.user;
}

// Bearer <token>
export function getAuthorizationHeader(ctx): string {
  return ctx.req.headers.authorization;
}
