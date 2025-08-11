import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';
import { loadOpenApiDocument, getSpecPath } from './config/swagger';

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Healthcheck
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() });
});

// Swagger UI
const openapiDoc = loadOpenApiDocument();
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiDoc, {
  explorer: true,
  customSiteTitle: 'MIMO Movies API Docs',
  swaggerOptions: {
    docExpansion: 'none',
    displayRequestDuration: true
  }
}));

// Exponer el spec también como JSON/YAML
app.get('/openapi.json', (_req, res) => res.status(200).json(openapiDoc));
app.get('/openapi.yaml', (_req, res) => res.status(200).sendFile(getSpecPath()));


app.use('/', routes);

// 404 y errores
app.use(notFoundHandler);
app.use(errorHandler);


export default app;