import { LoginDto } from './dto/login.dto';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './../services/auth.service';
import { AuthPayload } from './../generated/graphql';
import { SignupDto } from './dto/signup.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Mutation('signup')
  async signup(@Args('data') data: SignupDto): Promise<AuthPayload> {
    const user = await this.auth.createUser(data);
    return this.auth.createAuthPayload(user);
  }

  @Mutation('login')
  async login(@Args('data') data: LoginDto): Promise<AuthPayload> {
    const user = await this.auth.login(data);
    return this.auth.createAuthPayload(user);
  }
}
