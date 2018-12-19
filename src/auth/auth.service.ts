import { User } from '../generated/prisma-client';
import { environment } from '../environments/environment';
import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import {
  SignupPayload,
  LoginPayload,
  JwtPayload,
  AuthPayload
} from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService
  ) {}

  async createUser(payload: SignupPayload): Promise<User> {
    const hashedPassword = await this.hash(payload.password);

    return await this.prisma.client.createUser({
      name: payload.name,
      email: payload.email,
      password: hashedPassword
    });
  }

  async login(payload: LoginPayload): Promise<User> {
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

  validateUser(payload: JwtPayload): Promise<User> {
    return this.prisma.client.user({ id: payload.userId });
  }

  hash(password: string): Promise<string> {
    return hash(password, environment.saltOrRounds);
  }

  compare(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
  }

  createAuthPayload(user: User): AuthPayload {
    return {
      token: this.jwtService.sign({ userId: user.id }),
      user
    };
  }
}
