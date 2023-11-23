export interface IHttpStatusList {
  BAD_REQUEST: IHttpStatus;
  UNAUTHORIZED: IHttpStatus;
  FORBIDDEN: IHttpStatus;
  NOT_FOUND: IHttpStatus;
  TOO_MANY_REQUESTS: IHttpStatus;
  INTERNAL_SERVER_ERROR: IHttpStatus;
  NOT_IMPLEMENTED: IHttpStatus;
}

export interface IHttpStatus {
  statusCode: number;
  name: string;
  message: string;
}

export interface IAppError extends IHttpStatus {
  success: false;
  service: string;
  details?: string;
}
