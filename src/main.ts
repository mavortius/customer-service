import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerOpts = new DocumentBuilder()
    .setTitle('Customer Web Service')
    .setDescription('Demo API for Customer Web Service')
    .setVersion('1.0')
    .setBasePath('api')
    .addTag('customers')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOpts);

  SwaggerModule.setup('docs', app, swaggerDocument);
  app.enableCors();
  app.setGlobalPrefix('api');

  await app.listen(3000);
}

bootstrap();
