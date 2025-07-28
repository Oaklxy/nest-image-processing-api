import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Prisma } from 'generated/prisma';
import * as argon2 from 'argon2';

import { SignInDto, SignUpDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';
import { IJWTPayload } from './interfaces';

@Injectable()
export class AuthService {
  public constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) { };

  public async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user: UserModel | null = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    };

    if (!await argon2.verify(password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    };

    const payload: IJWTPayload = {
      id: user.id,
      email: user.email,
    };

    const tokens = await this.generateTokens(payload);

    return {
      ok: true,
      message: 'User logged in successfully',
      data: {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      },
    };
  };

  public async signUp(signUpDto: SignUpDto) {
    try {
      const hashedPassword: string = await argon2.hash(signUpDto.password);

      const newUser: UserModel = await this.prismaService.user.create({
        data: {
          ...signUpDto,
          password: hashedPassword,
        },
      });
      
      const payload: IJWTPayload = {
        id: newUser.id,
        email: newUser.email,
      };

      const tokens = await this.generateTokens(payload);

      return {
        ok: true,
        message: 'User registered successfully',
        data: {
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
        },
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException('This email is already registered');
      };
    };
  };

  //TODO: Implement this method
  public async signOut() {

  };

  public async validateUser(id: string): Promise<UserModel | null> {
    const user: UserModel | null = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new UnauthorizedException(`Incorrect credentials`);
    };

    return user;
  };

  private async generateTokens(payload: IJWTPayload): Promise<any> {
    const accessToken: string = await this.jwtService.signAsync(payload, { expiresIn: '15m', secret: this.configService.get<string>('JWT_SECRET_KEY')});
    const refreshToken: string = await this.jwtService.signAsync(payload, { expiresIn: '24h', secret: this.configService.get<string>('JWT_SECRET_KEY')});

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  };
};
