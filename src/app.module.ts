import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { envValidationsSchema } from './config';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,

      //* Allows nested environment variables using ${VAR} syntax
      //* Example: DATABASE_URL=postgres://${DATABASE_USER}:${DATABASE_PASSWORD}
      expandVariables: true,
      validationSchema: envValidationsSchema,
    }),
    PrismaModule,
  ],
})
export class AppModule { };
