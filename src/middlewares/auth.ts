import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AuthError from '../errors/AuthError';
import { errorResponses } from '../utilits/constants';

interface SessionRequest extends Request {
  user?: string | JwtPayload;
}

const handleAuthError = () => new AuthError(errorResponses.authenticationRequiredError.message);

const extractBearerToken = (header: string) => header.replace('Bearer ', '');

export default (req: SessionRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(handleAuthError());
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return next(handleAuthError());
  }

  req.user = payload;
  return next();
};
