import { NextFunction, Response, Request } from 'express';
import { errorResponses } from '../utilits/constants';

const handleErrors = (error: any, req: Request, res: Response, next: NextFunction): void => {
  const { statusCode =  errorResponses.internalServerError.code, message } = error;
  res.status(statusCode).send({ message: statusCode === 500? errorResponses.internalServerError.message : message });
};

export default handleErrors;
