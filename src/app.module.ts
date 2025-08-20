import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { envValidationsSchema } from './config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ImagesModule } from './modules/images/images.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationsSchema,

      //* Allows nested environment variables using ${VAR} syntax
      //* Example: DATABASE_URL=postgres://${DATABASE_USER}:${DATABASE_PASSWORD}
      expandVariables: true,
    }),
    PrismaModule,
    AuthModule,
    ImagesModule,
    UsersModule,
  ],
})
export class AppModule { };
