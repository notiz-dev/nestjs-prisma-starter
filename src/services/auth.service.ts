import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { User } from './../generated/prisma-client';
import { PasswordService } from './password.service';
import { SignupInput } from '../resolvers/auth/dto/signup.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService
  ) {}

  async createUser(payload: SignupInput): Promise<string> {
    const hashedPassword = await this.passwordService.hashPassword(
      payload.password
    );

    const user = await this.prisma.client.createUser({
      ...payload,
      password: hashedPassword
    });

    return this.jwtService.sign({ userId: user.id });
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.prisma.client.user({ email });

    if (!user) {
      throw new Error(`No user found for email: ${email}`);
    }

    const passwordValid = await this.passwordService.validatePassword(
      password,
      user.password
    );

    if (!passwordValid) {
      throw new Error('Invalid password');
    }

    return this.jwtService.sign({ userId: user.id });
  }

  validateUser(userId: string): Promise<User> {
    return this.prisma.client.user({ id: userId });
  }

  getUserFromToken(token: string): Promise<User> {
    const id = this.jwtService.decode(token)['userId'];
    return this.prisma.client.user({ id });
  }
}
