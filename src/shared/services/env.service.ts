import { IEnvironment } from '../interfaces';
import dotenv from 'dotenv';

const env: IEnvironment = (process.env.NODE_ENV?.trim() as IEnvironment) ?? 'development';

dotenv.config({ path: env === 'production' ? '.env' : '.env.development' });
