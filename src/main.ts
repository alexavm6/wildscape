import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { envs } from './config/envs';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());

  //route /api
  app.setGlobalPrefix('api');

  /*
    whitelist: true, // Esto asegura que solo los campos definidos en el DTO son pasados

    forbidNonWhitelisted: true, // Si hay campos no definidos en el DTO, lanza un error

    transform: true, // Transforma los query strings a los tipos definidos en el DTO (ej. "20" a 20 si es @IsNumber)

    transformOptions: { enableImplicitConversion: true }, // Permite la conversión implícita para @IsNumber
  */
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  //swagger
  const config = new DocumentBuilder().setTitle('Wild Scape API').build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  //enable cors
  app.enableCors();

  await app.listen(envs.port);
  console.log(`Server running on port ${envs.port}`);
}
bootstrap();
