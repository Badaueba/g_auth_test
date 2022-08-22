import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersMiddleware {
  async executeOrganizationsMiddleWares(
    params: Prisma.MiddlewareParams,
    next: (params: Prisma.MiddlewareParams) => Promise<any>,
    action: string,
  ) {
    console.log('init middleware');
    const middlewares = {
      create: async () => {
        params.args.data.name = String(params.args.data.name).toUpperCase();
        return next(params.args.data);
      },
      findUnique: async () => {
        const user = await next(params.args);
        if (!user) return null;
        user.name = String(user.name).toLocaleLowerCase();
        return user;
      },
    };

    if (action === 'create') return middlewares.create();
    if (action === 'findUnique') return middlewares.findUnique();
    return next(params);
  }
}
