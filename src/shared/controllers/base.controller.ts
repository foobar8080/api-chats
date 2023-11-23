import ResponseHandler from '../helpers/response.helper';
import { asyncWrap } from '../middlewares/async-wrapper.middleware';

class BaseController {
  asyncWrap;
  sendResponse;

  constructor() {
    this.asyncWrap = asyncWrap;
    this.sendResponse = ResponseHandler.send;
  }
}

export default BaseController;
