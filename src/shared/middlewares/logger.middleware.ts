/* 
---------------------
  LOGGER
---------------------

Custom logger created on top of Winston: https://github.com/winstonjs/winston

`npm i winston express-winston`  
`npm i @types/winston -D`

Provides `logger` and `requestLogger` / `errorLogger` middlewares.

Works with process.env.NODE_ENV variable.

To add logs:
------------

1. Create logger instance:
  ```js 
  import { Logger } from 'winston';
  import { getLogger } from './shared/middlewares/logger.middleware';
  const logger: Logger = getLogger();
  ```

2. Use one of these methods in **development** mode to log messages in the console:
  - `logger?.info('Add some info message')`
  - `logger?.warn('Add some warn message')`
  - `logger?.error('Add some error message')`

3. Use the 'error' method in **production** mode to write errors to the *./logs/errors.log* file:
  - `logger?.error('Add some error message')`
*/

import { createLogger, transports, format, Logger } from 'winston';
import expressWinston from 'express-winston';
import { IEnvironment } from '../interfaces';
// import { Request } from 'express';

const ENV = process.env.NODE_ENV?.trim() as IEnvironment;
const logsFolder = './logs';
const { combine, timestamp, colorize, printf } = format;

const formatMessage = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] ${message}`;
});

export const getLogger = (): Logger => {
  return ENV === 'development' ? loggerDev() : loggerProd();
};

// -----------------
// Create a loggers
// -----------------

const loggerDev = (): Logger =>
  createLogger({
    level: 'info',
    format: combine(timestamp({ format: 'HH:mm:ss' }), colorize(), formatMessage),
    transports: [new transports.Console()]
  });

const loggerProd = (): Logger =>
  createLogger({
    level: 'error',
    format: combine(timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }), formatMessage),
    transports: [new transports.File({ filename: `${logsFolder}/errors.log` })]
  });

// ----------------------------
// Create a logger middlewares
// ----------------------------

/** Add requestLogger before any other middlewares or routes */

export const requestLogger = () => {
  return expressWinston.logger({
    winstonInstance: getLogger(),
    msg: () => '{{req.method}} {{req.originalUrl}} [{{res.statusCode}}]',

    // To display logs with a req.body:
    // msg: (req) => '{{req.method}} {{req.originalUrl}} [{{res.statusCode}}]' + getReqBody(req),

    meta: false
  });
};

/** Add errorLogger after all other middleware and routes, but before the error handler */

export const errorLogger = () => {
  return expressWinston.errorLogger({
    winstonInstance: getLogger(),
    msg: () => '{{req.method}} {{req.originalUrl}} [{{err.statusCode || 500}}] [{{err.name}}] {{err.message}}',

    // To display logs with a req.body:
    // msg: (req) => '{{req.method}} {{req.originalUrl}} [{{err.statusCode || 500}}]' + getReqBody(req) + ' {{err.name}} {{err.message}}',

    meta: false
  });
};

// function getReqBody(req: Request): string {
//   const reqBody = req.body && Object.keys(req.body).length ? ' ' + JSON.stringify(req.body) : '';
//   return reqBody;
// }
