import { Response } from 'express';
import { IAppResponse } from '../interfaces';

export default class ResponseHandler {
  static send(res: Response, payload: object | null, statusCode = 200, success = true) {
    const response: IAppResponse = {
      success,
      payload
    };
    return res.status(statusCode).json(response);
  }
}
