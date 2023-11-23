import createError from 'http-errors';
import { IHttpStatus } from './exception.interface';
import { HTTP_STATUS } from './http-status.constant';

/**
  How to use ERROR in a route handler:

  app.get("/route", (req, res, next) => {   
    if (someCondition) {   
      return next(ERROR.BAD_REQUEST());  
    }   
  });
 */
export const ERROR = {
  BAD_REQUEST: (details?: string) => createHttpError(HTTP_STATUS.BAD_REQUEST, details),
  UNAUTHORIZED: (details?: string) => createHttpError(HTTP_STATUS.UNAUTHORIZED, details),
  FORBIDDEN: (details?: string) => createHttpError(HTTP_STATUS.FORBIDDEN, details),
  NOT_FOUND: (details?: string) => createHttpError(HTTP_STATUS.NOT_FOUND, details),
  TOO_MANY_REQUESTS: (details?: string) => createHttpError(HTTP_STATUS.TOO_MANY_REQUESTS, details),
  INTERNAL_SERVER_ERROR: (details?: string) => createHttpError(HTTP_STATUS.INTERNAL_SERVER_ERROR, details),
  NOT_IMPLEMENTED: (details?: string) => createHttpError(HTTP_STATUS.NOT_IMPLEMENTED, details)
};

function createHttpError(httpStatus: IHttpStatus, details?: string) {
  // See handleError() in ./exception-handler.middleware.ts

  const addDetails = details ? ' # ' + details : '';
  return createError(httpStatus.statusCode, httpStatus.message + addDetails);
}
