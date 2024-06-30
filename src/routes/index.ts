import { Request, Response, Router } from 'express';
import userRouter from './users';
import cardRouter from './cards';
import { notFoundError } from '../utilits/utils';

const routes = Router();

routes

  .use('/cards', cardRouter)
  .use('/users', userRouter)
  .use((req: Request, res: Response) => res.status(notFoundError.error).send({ message: notFoundError.message }));

export default routes;
