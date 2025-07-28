import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

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
  ) {
    return this.authService.signIn(signInDto);
  };

  @Post('signup')
  public signUp(
    @Body() signUpDto: SignUpDto,
  ) {
    return this.authService.signUp(signUpDto);
  };
};
