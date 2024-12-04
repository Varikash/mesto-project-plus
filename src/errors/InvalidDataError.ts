import { errorResponses } from '../utilits/constants';

class InvalidDataError extends Error {
  statusCode: number;

  originalError?: Error;

  constructor(message: string | undefined, originalError?: Error) {
    super(message);
    this.statusCode = errorResponses.invalidDataError.code;
    this.originalError = originalError;

    Object.setPrototypeOf(this, InvalidDataError.prototype);
  }
}

export default InvalidDataError;
