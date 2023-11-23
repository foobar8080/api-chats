import * as os from 'os';

export interface IApiHealth {
  api: string;
  version: string;
  timestamp: string;
  uptime: string;
  RAM: string;
  platform: NodeJS.Platform;
  arch: string;
  type: string;
  release: string;
  hostname: string;
  cpus: os.CpuInfo[];
}
