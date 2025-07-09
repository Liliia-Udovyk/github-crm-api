import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const options = new DocumentBuilder()
  .setTitle('GitHub CRM API')
  .setDescription('API for managing public GitHub repositories')
  .setVersion('1.0')
  .addBasicAuth()
  .addBearerAuth()
  .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'master-key')
  .build();

export const createSwagger = (app: NestExpressApplication) => {
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('doc', app, document);
};
