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
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET_KEY')!,
      passReqToCallback: true,
    });
  };

  public async validate(req: Request, payload: IJWTPayload): Promise<any> {
    const { id } = payload;

    const user: UserModel | null = await this.authService.validateUser(id);

    const rT: string | undefined = req
      ?.get('authorization')
      ?.replace('Bearer', '')
      .trim();

    if (!rT) {
      throw new ForbiddenException('Invalid refresh token');
    };

    return {
      payload,
      refresh_token: rT,
    };
  };
};