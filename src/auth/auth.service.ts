import { GoogleProfile } from './../types/types';
import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  SignupPayload,
  LoginPayload,
  JwtPayload,
  AuthPayload,
} from './auth.types';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../prisma/client';
import { ConfigService } from '../services/config/config.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService) { }

  async createUser(payload: SignupPayload): Promise<User> {
    const hashedPassword = await this.hash(payload.password);

    return await this.prisma.client.createUser({
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
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

  findUserByEmail(email: string): Promise<User> {
    return this.prisma.client.user({ email });
  }

  hash(password: string): Promise<string> {
    return hash(password, +process.env.PASSWORD_SALT_OR_ROUNDS || this.configService.getNumber('PASSWORD_SALT_OR_ROUNDS'));
  }

  compare(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
  }

  createAuthPayload(user: User): AuthPayload {
    return {
      token: this.jwtService.sign({ userId: user.id }),
      user,
    };
  }

  async validateGoogleOAuthLogin(profile: GoogleProfile): Promise<AuthPayload> {
    const email = profile.emails[0].value;
    let user = await this.findUserByEmail(email);

    if (!user) {
      user = await this.createUser({
        email,
        name: profile.displayName,
        password: Math.random().toString(36),
      });
    }

    return this.createAuthPayload(user);
  }

}
