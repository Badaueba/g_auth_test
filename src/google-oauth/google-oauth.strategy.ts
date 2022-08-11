import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { Profile } from './profile.interface';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  //   private readonly usersService: UsersService;
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('OAUTH_GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('OAUTH_GOOGLE_SECRET'),
      callbackURL: configService.get<string>('OAUTH_GOOGLE_REDIRECT_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ) {
    const { id, name, emails } = profile;

    const user =  {
      provider: 'google',
      providerId: id,
      name: name.givenName,
      email: emails[0].value,
    };

    done(null, user);
  }
}
