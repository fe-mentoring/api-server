import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/http-exception.filter';
import { env } from './shared/env';
import { VersioningType } from '@nestjs/common';
import expressBasicAuth from 'express-basic-auth';

const SWAGGER_END_POINT = 'docs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('/v1', { exclude: ['/'] });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(
    [`/${SWAGGER_END_POINT}`],
    expressBasicAuth({
      challenge: true,
      users: {
        [env.SWAGGER_USER]: env.SWAGGER_PASSWORD,
      },
    }),
  );

  patchNestJsSwagger();

  const config = new DocumentBuilder()
    .setTitle('To-do List API')
    .setDescription('The To-do List API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_END_POINT, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(env.PORT || 3000);
}

bootstrap();
