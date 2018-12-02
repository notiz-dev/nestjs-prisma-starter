import { PrismaService } from './../../services/prisma.service';
import { User } from './../../generated/prisma-client/index';
import { Resolver, Query, Args, Info, Mutation } from '@nestjs/graphql';

@Resolver()
export class UsersResolver {
    constructor(private readonly prisma: PrismaService) { }

    @Query('users')
    async getUsers(@Args() args, @Info() info): Promise<User[]> {
        return await this.prisma.prisma.users(args);
    }

    @Mutation('createUser')
    async createUser(@Args() args) {
        return await this.prisma.prisma.createUser(args);
    }
}