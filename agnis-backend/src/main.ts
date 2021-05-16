import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './Presentation/ExceptionFilters/http-exception.filter';

function configureSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Agnis')
    .setDescription('The Agnis API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter())
  app.enableCors({ origin: 'http://localhost:4200' });
  configureSwagger(app);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(5000);
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();
