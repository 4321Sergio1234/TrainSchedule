import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const corsOptions = 
    { 
      methods: '*',
      allowedHeaders: '*',
      origin: '*',
    };

  app.enableCors(corsOptions);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
