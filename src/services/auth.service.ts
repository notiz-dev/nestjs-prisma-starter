import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { AuthPayload, LoginInput, SignupInput } from './../generated/graphql';
import { User } from './../generated/prisma-client';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async createUser(payload: SignupInput): Promise<User> {
    const hashedPassword = await this.hash(payload.password);

    return await this.prisma.client.createUser({
      email: payload.email,
      password: hashedPassword,
      name: payload.name,
    });
  }

  async login(payload: LoginInput): Promise<User> {
    const user = await this.prisma.client.user({ email: payload.email });

    if (!user) {
      throw new Error(`No user found for email: ${payload.email}`);
    }

    const passwordValid = await this.compare(payload.password, user.password);
    if (!passwordValid) {
      throw new Error('Invalid password');
    }
    return user;
  }

  createAuthPayload(user: User): AuthPayload {
    return {
      token: this.jwtService.sign({ userId: user.id }),
      user,
    };
  }

  validateUser(userId: string): Promise<User> {
    return this.prisma.client.user({ id: userId });
  }

  private hash(password: string): Promise<string> {
    return hash(password, 10);
  }

  private compare(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
  }
}
