import { NextFunction, Request, Response } from 'express';

/** 
Used to wrap an async route handler function to catch any errors that occur during the asynchronous operation and pass them to the next() function, which can handle it appropriately.

How to use:

- before asyncWrap:        
app.get('/path', async (req, res) => await asyncOperationFail() );

- after asyncWrap:     
app.get('/path', asyncWrapper( async (req, res) => await asyncOperationFail() ));
*/
export const asyncWrap = <T>(handler: (req: Request, res: Response, next: NextFunction) => Promise<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    handler(req, res, next).catch(next);
  };
};
