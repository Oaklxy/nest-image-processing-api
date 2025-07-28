import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User as UserModel } from '@prisma/client'

import { AuthService } from '../auth.service';
import { IJWTPayload } from '../interfaces';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET_KEY')!,
    });
  };

  public async validate(payload: IJWTPayload): Promise<IJWTPayload> {
    const { id } = payload;

    const user: UserModel | null = await this.authService.validateUser(id);

    return payload;
  };
};
