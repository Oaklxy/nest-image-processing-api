import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { IJWTPayload } from '../interfaces';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  public constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) { };

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractJwt(request);

    if (!token) {
      throw new UnauthorizedException('Authentication token is missing');
    };

    try {
      const payload: IJWTPayload = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.configService.get<string>('JWT_SECRET_KEY'),
        },
      );

      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    };

    return true;
  };

  private extractJwt(request: Request): string | undefined {
    const token = request.cookies?.Authentication;
    return typeof token === 'string' ? token : undefined;
  };
};