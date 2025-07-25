import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const logger: Logger = new Logger('Image-Processing-Api');
  const configService: ConfigService = new ConfigService();
  const port: string = configService.get<string>('PORT') ?? '8080';
  const config = new DocumentBuilder()
    .setTitle('Image-Processing-Api')
    .setDescription('API that allows authenticated users process images')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.listen(port);

  logger.log(`Server is running on port ${port}`);
}
bootstrap();
