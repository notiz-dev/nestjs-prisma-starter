import { AuthPayload, SignupPayload, LoginPayload } from './auth.types';
import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Mutation('signup')
  async signup(@Args() payload: SignupPayload): Promise<AuthPayload> {
    const user = await this.auth.createUser(payload);
    return this.auth.createAuthPayload(user);
  }

  @Mutation('login')
  async login(@Args() payload: LoginPayload): Promise<AuthPayload> {
    const user = await this.auth.login(payload);
    return this.auth.createAuthPayload(user);
  }
}
