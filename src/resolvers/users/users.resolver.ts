import { GqlAuthGuard } from './../../auth/auth.guard';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from './../../generated/prisma-client';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserEntity } from 'auth/user.decorator';

@Resolver()
export class UsersResolver {
    constructor(
        private readonly prisma: PrismaService) { }

    @Query('me')
    @UseGuards(GqlAuthGuard)
    async me(@UserEntity() user: User): Promise<User> {
        return user;
    }
}