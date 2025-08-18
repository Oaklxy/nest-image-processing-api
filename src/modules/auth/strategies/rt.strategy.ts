import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { User as UserModel } from '@prisma/client';

import { AuthService } from '../auth.service';
import { IJWTPayload } from '../interfaces';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req.cookies?.Refresh,
      ]),
      secretOrKey: configService.get<string>('JWT_SECRET_KEY')!,
      passReqToCallback: true,
    });
  };

  public async validate(req: Request, payload: IJWTPayload): Promise<any> {
    const rT: string = req.cookies?.Refresh;

    const user = await this.authService.validateUserRefreshToken(payload.id, rT);

    return {
      payload,
      refresh_token: rT,
    };
  };
};