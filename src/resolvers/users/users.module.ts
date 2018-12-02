import { AuthModule } from './../../services/auth.module';
import { PrismaModule } from './../../services/prisma.module';
import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [PrismaModule,
  AuthModule],
  providers: [UsersResolver],
})
export class UsersModule {}