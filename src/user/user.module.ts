import { UserResolver } from './user.resolver';
import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  providers: [UserResolver],
})
export class UserModule {}
