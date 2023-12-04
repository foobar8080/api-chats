import { Response } from 'express';
import { IAppResponse } from '../interfaces';

export default class ResponseHandler {
  /**
   * If only `res` provided, the resulting response will looks like:
   *
   * { success: true, payload: null }
   */
  static send(res: Response, payload: object | null = null, statusCode = 200, success = true) {
    const response: IAppResponse = {
      success,
      payload
    };
    return res.status(statusCode).json(response);
  }
}
