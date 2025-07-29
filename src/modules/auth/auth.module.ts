import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AtStrategy, RtStrategy } from './strategies';
import { UsersService } from '../users/user.service';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_AT_EXPIRES_IN', '15m'),
        },
      }),
    }),
  ],
  providers: [AuthService, AtStrategy, RtStrategy, UsersService],
  controllers: [AuthController],
  exports: [AuthService, AtStrategy, RtStrategy, PassportModule, JwtModule],
})
export class AuthModule { };
