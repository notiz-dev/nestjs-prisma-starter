import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { PrismaModule } from '@prisma/prisma.module';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from '@guards/auth.guard';
import { AuthResolver } from './auth.resolver';
import { environment } from '@env/environment';

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
