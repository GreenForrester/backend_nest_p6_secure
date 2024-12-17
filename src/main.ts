import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1/api'); // global prefix
  // Enable CORS and Options for react axios
  app.enableCors({
    origin: 'http://localhost:5173', // react frontend URL (adjust for production)
    methods: ['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type'], // Allowed headers
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
