import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { User as UserModel } from '@prisma/client';

import { IJWTPayload } from '../interfaces';
import { AuthService } from '../auth.service';

export class JwtRefreshAuthGuard implements CanActivate {
  public constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) { };

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractRefreshToken(request);

    if (!token) {
      throw new UnauthorizedException('Refresh token is missing');
    };

    try {
      const payload: IJWTPayload = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.configService.get<string>('JWT_SECRET_KEY'),
        },
      );

      const user = await this.authService.validateUserRefreshToken(payload.id, token);

      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      };

      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    };

    return true;
  };

  private extractRefreshToken(request: Request): string | undefined {
    const token = request.cookies?.Refresh;
    return typeof token === 'string' ? token : undefined;
  };
};