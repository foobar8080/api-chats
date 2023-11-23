import { ErrorRequestHandler, RequestHandler, Response } from 'express';
import { HttpError } from 'http-errors';
import { ERROR } from './error-list';
import { HTTP_STATUS } from './http-status.constant';
import { IHttpStatus, IAppError } from './exception.interface';

const API_NAME: string = process.env.API_NAME?.trim() || '';

export class ExceptionHandler {
  /**
   * Not found page handler:
   * - handles requests that do not match any of the defined routes;
   * - should be added after all other routes and middleware functions, but before:
   *   - the error logger middleware
   *   - the error handler middleware
   */
  static handleNotFound: RequestHandler = (req, res, next): void => {
    next(ERROR.NOT_FOUND());
  };

  /**
   * Global HTTP error handler:
   * - transform any error object into a standardized error format;
   * - returns a JSON response containing the standardized error object with the appropriate HTTP status code.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static handleError: ErrorRequestHandler<Error | HttpError> = (err, req, res, next): Response<IAppError> => {
    console.log(err);

    const internalServerError: IHttpStatus = HTTP_STATUS.INTERNAL_SERVER_ERROR;

    const [message, details] = err.message.split(' # '); // See ./error-list.ts

    const error: IAppError = {
      success: false,
      statusCode: err instanceof HttpError ? err.statusCode : internalServerError.statusCode,
      name: err.name || internalServerError.name,
      message: message || internalServerError.message,
      service: API_NAME
    };

    if (details) error.details = details;

    return res.status(error.statusCode).json(error);
  };
}

/*

  ErrorRequestHandler type takes care of the type declarations for err, req, res, and next. 
  
  ErrorRequestHandler<Error | HttpError> takes one type parameter, which specifies types for the err parameter.

  - This code ->

  static handleError(
    err: Error | HttpError,
    req: Request,
    res: Response,
    next: NextFunction
  ): Response<IAppError> {}

  - Equivalent to this code ->

  static handleError: ErrorRequestHandler<Error | HttpError> = (
    err,
    req,
    res,
    next
  ): Response<IAppError> => {}

*/
