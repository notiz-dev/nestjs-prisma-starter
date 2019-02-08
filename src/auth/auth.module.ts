import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { GqlAuthGuard } from '../guards/auth.guard';
import { ConfigService } from '../services/config/config.service';
import { ConfigModule } from '../services/config/config.module';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secretOrPrivateKey: process.env.JWT_SECRET || configService.getString('JWT_SECRET'),
        signOptions: {
          expiresIn: process.env.JWT_EXPIRES_IN || configService.getString('JWT_EXPIRES_IN'),
        },
      }),
      inject: [ConfigService],
    }),
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleStrategy,
    JwtStrategy,
    AuthResolver,
    GqlAuthGuard,
  ],
  exports: [GqlAuthGuard],
})
export class AuthModule { }
