import { errorResponses } from '../utilits/constants';

class ServerError extends Error {
  statusCode: number;

  originalError?: Error;

  constructor(message: string | undefined, originalError?: Error) {
    super(message);
    this.statusCode = errorResponses.internalServerError.code;
    this.originalError = originalError;

    Object.setPrototypeOf(this, ServerError.prototype);
  }
}

export default ServerError;
