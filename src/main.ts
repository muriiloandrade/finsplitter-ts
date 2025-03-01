import { ConsoleLogger, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { EnvService } from '@infra/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const env = app.get<EnvService>(EnvService);

  app.useLogger(
    new ConsoleLogger({
      showHidden: true,
      json: env.logFormat === 'production',
      logLevels: ['verbose', 'debug', 'log', 'warn', 'error', 'fatal'],
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('FinSplitter')
    .setDescription('Documentação da API FinSplitter')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' });

  config.addServer(`http://localhost:${env.appEnv}`, 'Local');

  const swaggerUrl = 'docs';
  const document = SwaggerModule.createDocument(app, config.build());
  SwaggerModule.setup(swaggerUrl, app, document, {
    yamlDocumentUrl: `${swaggerUrl}/yaml`,
    jsonDocumentUrl: `${swaggerUrl}/json`,
  });

  await app.listen(env.port);
  Logger.log(`App running on port: ${env.port}`);
}
bootstrap();
