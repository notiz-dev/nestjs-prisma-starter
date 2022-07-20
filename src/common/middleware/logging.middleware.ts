import { Prisma } from '@prisma/client';

export function loggingMiddleware(logger: any = console): Prisma.Middleware {
  return async (params, next) => {
    const before = Date.now();

    const result = await next(params);

    const after = Date.now();

    logger.log(
      `Prisma Query ${params.model}.${params.action} took ${after - before}ms`
    );

    return result;
  };
}
