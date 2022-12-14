import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /* main.ts - useGlobalPipes addition */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, 
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {                // from Adding Pagination
        enableImplicitConversion: true,
      },
    }),
  );

  // Setting up Swagger document 
const options = new DocumentBuilder()
  .setTitle('Iluvcoffee')
  .setDescription('Coffee application')
  .setVersion('1.0')
  .build();
const document = SwaggerModule.createDocument(app, options); 
SwaggerModule.setup('api', app, document);

/*
  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(),
  );
  */
  await app.listen(3000);
}
bootstrap();
