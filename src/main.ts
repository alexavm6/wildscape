import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { envs } from './config/envs';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //route /api
  app.setGlobalPrefix('api');

  //pipes:
  //whitelist get rid of fields not defined in the DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
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
