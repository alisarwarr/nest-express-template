import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as googleStrategy, googleProfile, googleVerifyCallback } from 'passport-google-oauth20';
import { Strategy as facebookStrategy, facebookProfile, facebookVerifyCallback } from 'passport-facebook';
import { AuthService } from '../auth/auth.service';
import { TYPE } from '../utils/constants';

@Injectable()
export class GoogleStrategy extends PassportStrategy(googleStrategy, 'google') {
    constructor(private readonly authService: AuthService) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            scope: ['email', 'profile']
        });
    }

    validate(accessToken: string, refreshToken: string, profile: googleProfile, done: googleVerifyCallback) {
        console.log("* * * Google Strategy * * *");

        console.log({ accessToken, refreshToken, profile });

        return this.authService.socialUser(TYPE.GOOGLE, profile.emails[0].value, done);
    }
}

@Injectable()
export class FacebookStrategy extends PassportStrategy(facebookStrategy, 'facebook') {
    constructor(private readonly authService: AuthService) {
        super({
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: process.env.FACEBOOK_CALLBACK_URL,
            profileFields: ['id', 'displayName', 'emails']                                                // make sure 'emails' is requested here
        });
    }

    validate(accessToken: string, refreshToken: string, profile: facebookProfile, done: facebookVerifyCallback) {
        console.log("* * * Facebook Strategy * * *");

        console.log({ accessToken, refreshToken, profile });

        return this.authService.socialUser(TYPE.FACEBOOK, profile._json.email, done);
    }
}