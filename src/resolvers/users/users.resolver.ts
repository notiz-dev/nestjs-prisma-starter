import { UserId } from './../../services/utils.service';
import { AuthGuard } from './../../guards/auth.guards';
import { AuthService } from './../../services/auth.service';
import { PrismaService } from './../../services/prisma.service';
import { User } from './../../generated/prisma-client';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class UsersResolver {
    constructor(
        private readonly prisma: PrismaService,
        private readonly auth: AuthService) { }

    @Query('me')
    @UseGuards(AuthGuard)
    async me(@UserId() id, @Args() args): Promise<User> {
        return await this.prisma.client.user({ id });
    }

    @Query('user')
    async getUser(@Args() args): Promise<User> {
        return await this.prisma.client.user(args);
    }

    @Query('users')
    async getUsers(@Args() args): Promise<User[]> {
        return await this.prisma.client.users(args);
    }

    @Mutation('signup')
    async signup(@Args() { email, password, name }) {
        const hashedPassword = await this.auth.hash(password);

        const user = await this.prisma.client.createUser({
            name,
            email,
            password: hashedPassword,
        });

        return this.auth.createAuthPayload(user);
    }

    @Mutation('login')
    async login(@Args() { email, password }) {
        const user = await this.prisma.client.user({ email });
        if (!user) {
            throw new Error(`No user found for email: ${email}`);
        }

        const passwordValid = await this.auth.compare(password, user.password);
        if (!passwordValid) {
            throw new Error('Invalid password');
        }

        return this.auth.createAuthPayload(user);
    }
}