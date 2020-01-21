import { UserResolver } from './user.resolver';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';

@Module({
  providers: [UserResolver, PrismaService]
})
export class UserModule {}
