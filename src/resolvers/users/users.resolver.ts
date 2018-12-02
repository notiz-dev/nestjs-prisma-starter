import { PrismaService } from './../../services/prisma.service';
import { User } from './../../generated/prisma-client/index';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

@Resolver()
export class UsersResolver {
    constructor(private readonly prisma: PrismaService) { }

    @Query('user')
    async getUser(@Args() args): Promise<User> {
        return await this.prisma.client.user(args);
    }

    @Query('users')
    async getUsers(@Args() args): Promise<User[]> {
        return await this.prisma.client.users(args);
    }

    @Mutation('createUser')
    async createUser(@Args() args) {
        return await this.prisma.client.createUser(args);
    }
}