import { Module } from "@nestjs/common";
import { UsersMiddleware } from './middlewares/users-middleware';
import { PrismaService } from './prisma.service';

@Module({
  providers: [UsersMiddleware, PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}