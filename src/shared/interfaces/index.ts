export type IEnvironment = 'development' | 'production';

export interface IAppResponse {
  success: boolean;
  payload: object | null;
}
