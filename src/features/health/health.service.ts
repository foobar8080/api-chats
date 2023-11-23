import * as os from 'os';
import * as process from 'process';
import { IApiHealth } from './health.interface';
import { bytesToGB } from './health.helper';

const API_NAME: string = process.env.API_NAME?.trim() || '';
const VERSION: string = process.env.VERSION?.trim() || '';

class HealthService {
  async checkApiHealth(): Promise<IApiHealth> {
    const uptimeInSeconds = process.uptime();
    const days = Math.floor(uptimeInSeconds / (60 * 60 * 24));
    const hours = Math.floor((uptimeInSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((uptimeInSeconds % (60 * 60)) / 60);

    const uptime = `${days} days / ${hours} hours / ${minutes} minutes`;

    const totalMemory = bytesToGB(os.totalmem());
    const freeMemory = bytesToGB(os.freemem());
    const usedMemory = totalMemory - freeMemory;

    const health = {
      api: API_NAME,
      version: VERSION,
      timestamp: new Date().toLocaleString(),
      uptime,
      RAM: `Total: ${totalMemory.toFixed(2)} GB / Free: ${freeMemory.toFixed(2)} GB / Used: ${usedMemory.toFixed(2)} GB`,
      platform: os.platform(),
      arch: os.arch(),
      type: os.type(),
      release: os.release(),
      hostname: os.hostname(),
      cpus: os.cpus()
    };

    return health;
  }
}

export default new HealthService();
