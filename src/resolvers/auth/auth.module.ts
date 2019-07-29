import { PasswordService } from './../../services/password.service';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuthService } from '../../services/auth.service';
import { AuthResolver } from './auth.resolver';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { authConstants } from './../../common/auth/constants';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: authConstants.jwtSecret
    }),
    PrismaModule
  ],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
    GqlAuthGuard,
    PasswordService
  ],
  exports: [GqlAuthGuard]
})
export class AuthModule {}
