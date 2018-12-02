import { environment } from './../../environments/environment';
import { PrismaService } from './../../services/prisma.service';
import { User } from './../../generated/prisma-client/index';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

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

    @Mutation('signup')
    async signup(@Args() { email, password, name }) {
        const hashedPassword = await hash(password, 10);

        const user = await this.prisma.client.createUser({
            name,
            email,
            password: hashedPassword,
        });
        return {
            token: sign({ userId: user.id }, environment.secret),
            user,
        };
    }

    @Mutation('login')
    async login(@Args() { email, password }) {
        const user = await this.prisma.client.user({ email });
        if (!user) {
            throw new Error(`No user found for email: ${email}`);
        }

        const passwordValid = await compare(password, user.password);
        if (!passwordValid) {
            throw new Error('Invalid password');
        }

        return {
            token: sign({ userId: user.id }, environment.secret),
            user,
        };
    }
}