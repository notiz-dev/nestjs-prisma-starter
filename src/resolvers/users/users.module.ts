import { PrismaModule } from './../../services/prisma.module';
import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [PrismaModule],
  providers: [UsersResolver],
})
export class UsersModule {}