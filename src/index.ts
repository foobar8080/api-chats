// eslint-disable-next-line @typescript-eslint/no-var-requires
const xssClean = require('xss-clean'); // no `@types/xss-clean`
import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import './shared/services/env.service'; // Set .env-file
import { IEnvironment } from './shared/interfaces';
import healthRouter from './features/health/health.router';
import { ExceptionHandler } from './shared/exceptions/exception-handler.middleware';
import { errorLogger, getLogger, requestLogger } from './shared/middlewares/logger.middleware';
import { Logger } from 'winston';

const ENV: IEnvironment | undefined = process.env.NODE_ENV?.trim() as IEnvironment;
const PORT: string | undefined = process.env.PORT?.trim();
const API_NAME: string = process.env.API_NAME?.trim() || 'API';
const DOMAIN_WHITELIST: string[] = process.env.DOMAIN_WHITELIST?.trim().split(',') || [];

if (!ENV) throw new Error('NODE_ENV not provided');
if (!PORT) throw new Error('PORT not provided');

console.log(ENV, PORT, API_NAME);

const app: Application = express();

const logger: Logger = getLogger();

if (ENV === 'development') app.use(requestLogger());

app.use(cors({ origin: DOMAIN_WHITELIST }));
app.use(compression());
app.use(helmet());
app.use(express.json({ limit: '2000' })); // Limit body size to 2000 bytes
app.use(xssClean());

app.use('/health', healthRouter);

app.use(ExceptionHandler.handleNotFound);
app.use(errorLogger());
app.use(ExceptionHandler.handleError);

const start = async () => {
  try {
    app.listen(PORT, () => appCallback());
  } catch (error) {
    logger.error(error); // See file ./logs/errors.log in prod
    console.log(error);
  }
};

start();

function appCallback(): void {
  const msg = `${API_NAME?.toUpperCase()}: server started on port ${PORT}`;
  const separator = '-'.repeat(45);
  console.log(separator);
  console.log(msg);
  console.log(separator);
}
