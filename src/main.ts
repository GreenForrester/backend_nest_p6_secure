import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1/api'); // global prefix
  // Enable CORS and Options for react axios
  app.enableCors({
    origin: 'http://localhost:5173', // react frontend URL (adjust for production)
    methods: 'GET,HEAD,POST,PUT,DELETE,PATCH', // Allowed methods
    credentials: true, // Allow credentials (cookies, authorization headers)
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization', // Allowed headers
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
