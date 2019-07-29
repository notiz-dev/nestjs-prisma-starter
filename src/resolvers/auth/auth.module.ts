import { PhotonService } from './../../services/photon.service';
import { PasswordService } from './../../services/password.service';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
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
    })
  ],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy,
    GqlAuthGuard,
    PasswordService,
    PhotonService
  ],
  exports: [GqlAuthGuard]
})
export class AuthModule {}
