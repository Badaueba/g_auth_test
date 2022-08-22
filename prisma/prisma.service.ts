import {
  INestApplication,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UsersMiddleware } from './middlewares/users-middleware';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private usersMiddleware: UsersMiddleware) {
    super();
  }
  async onModuleInit() {
    await this.$connect();

    this.$use(async (params, next) => {
      switch (params.model) {
        case 'User':
          return this.usersMiddleware.executeOrganizationsMiddleWares(
            params,
            next,
            params.action,
          );

        default:
          break;
      }
      return next(params);
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => await app.close());
  }
}
