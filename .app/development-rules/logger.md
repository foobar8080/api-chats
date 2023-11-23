# Logger

Use the logger for efficient tracking of the development process *src\shared\middlewares\logger.middleware.ts*.

1. Create logger instance:
  ```js 
  import { Logger } from 'winston';
  import { getLogger } from './shared/middlewares/logger.middleware';
  const logger: Logger = getLogger();
  ```

2. Use one of these methods in **development** mode to log messages in the console:
  - `logger?.info('Add some info message')`
  - `logger?.warn('Add some warn message')`
  - `logger?.error('Add some error message')`

3. Use the 'error' method in **production** mode to write errors to the *./logs/errors.log* file:
  - `logger?.error('Add some error message')`
