import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for all origins and methods
  app.enableCors({
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Allow all HTTP methods
    allowedHeaders: '*', // Allow all headers
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false, // Will remove extra properties, but not throw an error
      transform: true,
    }),
  );
  app.setGlobalPrefix('api/v1');

  // Check the environment
  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('ExcelMind CRM API')
      .setDescription('API docs for CRM backend')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/v1/docs', app, document);
  }

  await app.listen(process.env.PORT || 3019);
}
bootstrap();
