import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // Habilita CORS para evitar bloqueios externos

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 API rodando na porta ${port}`);
}
bootstrap();
