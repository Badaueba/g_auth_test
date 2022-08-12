import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { GoogleOauthController } from './google-oauth.controller';
import { GoogleOauthStrategy } from './google-oauth.strategy';

@Module({
  controllers: [GoogleOauthController],
  providers: [GoogleOauthStrategy],
  imports: [UsersModule]
})
export class GoogleOauthModule {}
