import { ConfigService } from './../services/config/config.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService } from './auth.service';
import { GoogleProfile } from '../types/types';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) {
        super({
            clientID: process.env.GOOGLE_OAUTH_CLIENT_ID || configService.getString('GOOGLE_OAUTH_CLIENT_ID'),
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || configService.getString('GOOGLE_OAUTH_CLIENT_SECRET'),
            callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URL || configService.getString('GOOGLE_OAUTH_CALLBACK_URL'),
            passReqToCallback: true,
            scope: ['profile', 'email'],
        });
    }

    async validate(request: any, accessToken: string, refreshToken: string, profile: GoogleProfile) {
        const authPayload = await this.authService.validateGoogleOAuthLogin(profile);
        if (!authPayload) {
            throw new UnauthorizedException();
        }
        return { token: authPayload.token };
    }

}