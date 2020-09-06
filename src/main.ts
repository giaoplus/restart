import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { logger } from './middleware/logger.middleware';
import { AnyExceptionFilter } from './filter/any-exception.filter';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { ValidationPipe } from './pipe/validation.pipe';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use(logger);
  app.useGlobalFilters(new AnyExceptionFilter(), new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  const docOptions = new DocumentBuilder()
    .setTitle('restart')
    .setDescription('restart documentation')
    .setVersion('0.1')
    .addTag('test')
    .build();
  const document = SwaggerModule.createDocument(app, docOptions);
  SwaggerModule.setup('api-doc', app, document);
  await app.listen(3000);
}
bootstrap();
