import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('google-oauth')
export class GoogleOauthController {
  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() _req) {
    //guard redirects
  }

  @Get('/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    console.log('HERE', req['user']);
    return {
      message: 'User Information',
      user: req['user']
    }
  }
}
