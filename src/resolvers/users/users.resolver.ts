import { GqlAuthGuard } from './../../auth/auth.guard';
import { PrismaService } from './../../services/prisma.service';
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
    async me(@UserEntity() user: User, @Args() args): Promise<User> {
        return await this.prisma.client.user({ id: user.id });
    }

    @Query('user')
    async getUser(@Args() args): Promise<User> {
        return await this.prisma.client.user(args);
    }

    @Query('users')
    async getUsers(@Args() args): Promise<User[]> {
        return await this.prisma.client.users(args);
    }
}