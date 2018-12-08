import { PrismaModule } from './../../services/prisma.module';
import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [UsersResolver],
})
export class UsersModule { }