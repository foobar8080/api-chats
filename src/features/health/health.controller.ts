import BaseController from '../../shared/controllers/base.controller';
import service from './health.service';
import { Request, Response } from 'express';

class HealthController extends BaseController {
  checkApiHealth() {
    return this.asyncWrap(async (req: Request, res: Response): Promise<void> => {
      const health = await service.checkApiHealth();
      this.sendResponse(res, health);
    });
  }
}

export default new HealthController();
