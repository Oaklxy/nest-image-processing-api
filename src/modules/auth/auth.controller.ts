import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  public constructor(
    private readonly authService: AuthService,
  ) { };

  @Post('signin')
  public signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signIn(signInDto, res);
  };

  @Post('signup')
  public signUp(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signUp(signUpDto, res);
  };

  @Get('signout')
  public signOut(
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signOut(res);
  };
};
