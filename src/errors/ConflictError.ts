import { errorResponses } from '../utilits/constants';

class ConflictError extends Error {
  statusCode: number;

  constructor(message: string | undefined) {
    super(message);
    this.statusCode = errorResponses.emailConflictError.code;

    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

export default ConflictError;
