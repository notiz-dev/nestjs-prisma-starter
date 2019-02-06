import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { environment } from '../environments/environment';
import { PrismaModule } from '../prisma/prisma.module';
import { GqlAuthGuard } from '../guards/auth.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: environment.secret,
      signOptions: {
        expiresIn: environment.expiresIn,
      },
    }),
    PrismaModule,
  ],
  providers: [AuthService, JwtStrategy, AuthResolver, GqlAuthGuard],
  exports: [GqlAuthGuard],
})
export class AuthModule { }
