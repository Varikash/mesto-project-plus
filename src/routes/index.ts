import {
  NextFunction, Request, Response, Router,
} from 'express';
import userRouter from './users';
import cardRouter from './cards';
import ResourceError from '../errors/ResourceError';
import { errorResponses } from '../utilits/constants';

const routes = Router();

routes

  .use('/cards', cardRouter)
  .use('/users', userRouter)
  .use((req: Request, res: Response, next: NextFunction) => {
    const error = new ResourceError(errorResponses.resourceNotFoundError.message);
    next(error);
  });

export default routes;
