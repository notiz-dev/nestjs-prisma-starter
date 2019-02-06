import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [UsersResolver],
})
export class UsersModule { }
