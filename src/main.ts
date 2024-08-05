import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as express from 'express';
import * as path from 'path';

async function configureStaticFiles(app) {
  app.use(
    '/static',
    express.static(path.join(__dirname, '../..', 'public', 'uploads')),
  );
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Use morgan middleware
  app.use(morgan('dev'));
  app.enableCors();
  // setup swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Bizresolve REST APIs')
    .setDescription('The Bizresolve API description')
    .setVersion('1.0')
    .addTag('bizresolve')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apis', app, document);

  // Serve static files from the "public" folder
  await configureStaticFiles(app);
  await app.listen(5500);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
