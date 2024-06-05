import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as https from 'https';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  dotenv.config();

  app.enableCors({
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these methods
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  const httpsOptions = {
    key: fs.readFileSync('/usr/src/app/ssl/key.pem'),
    cert: fs.readFileSync('/usr/src/app/ssl/cert.pem'),
  };

  // Redirect HTTP to HTTPS
  app.use((req, res, next) => {
    if (!req.secure) {
      return res.redirect('https://' + req.headers.host + req.url);
    }
    next();
  });

  const expressApp = app.getHttpAdapter().getInstance();
  
  // Create HTTPS server
  https.createServer(httpsOptions, expressApp).listen(443, '0.0.0.0', () => {
    console.log('Application is running on https://localhost:443');
  });

  // Create HTTP server for redirecting to HTTPS
  https.createServer((req, res) => {
    res.writeHead(301, { 'Location': 'https://' + req.headers.host + req.url });
    res.end();
  }).listen(80);

  // Create HTTP server for testing on port 8081
  https.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Testing server is running on port 8081');
    res.end();
  }).listen(8081, '0.0.0.0', () => {
    console.log('Testing server is running on http://localhost:8081');
  });
}

function setupSwagger(app) {
  const paginationDocumentation = `
  ### Pagination

  All listing endpoints support pagination with a maximum of 100 items per page.

  #### Pagination Parameters

  - **page**:
    - Type: \`number\`
    - Description: Page number
    - Example: 1

  - **limit**:
    - Type: \`number\`
    - Description: Limit per page
    - Example: 10

  - **total**:
    - Type: \`number\`
    - Description: Total number of items available across all pages.
    - Example: 100

  - **items**:
    - Type: \`array\`
    - Description: Array of items for the current page. Each item follows a structure similar to when retrieving a single item.

  #### Example Response

  \`\`\`json
  {
    "page": 1,
    "limit": 10,
    "total": 100,
    "items": [...]
  }
  \`\`\`
  `;

  const authenticationDocumentation = `
  ### Authentication

  Authentication for this API is handled using JWT (JSON Web Tokens). Consumers need to obtain a JWT token and include it in the request headers for authentication.

  #### Obtaining JWT Token

  To obtain a JWT token, consumers need to perform an authentication request with valid credentials (e.g., username and password) to the authentication endpoint. Upon successful authentication, the server will respond with a JWT token in the response body.

  #### Using JWT Token

  Once obtained, consumers should include the JWT token in the \`Authorization\` header of subsequent requests. The token should be prefixed with the word "Bearer" followed by a space, like this:

  \`\`\`
  Authorization: Bearer <JWT Token>
  \`\`\`

  Including the JWT token in the request headers will authenticate the request and grant access to the protected resources.

  ### Swagger Authentication

  In Swagger, authentication is automatically applied to the requests for the consumer. Consumers can test the API endpoints by providing the JWT token in the request headers using Swagger's built-in authentication mechanisms.
  `;

  const options = new DocumentBuilder()
    .setTitle('Maintenance Sytem API Documentation')
    .setDescription(
      'This API provides routes for Maintenance Sytem API (description how to use the api should be here).',
    )
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'bearerAuth',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  document.info.description += paginationDocumentation;
  document.info.description += authenticationDocumentation;

  SwaggerModule.setup('api', app, document);
}

bootstrap();
