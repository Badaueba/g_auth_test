import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleOauthGuard } from './google-oauth.guard';

@Controller('google-oauth')
export class GoogleOauthController {
  @Get()
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() _req) {
    //guard redirects
  }

  @Get('/redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    console.log('HERE', req['user']);
    return req['user'];
  }
}
