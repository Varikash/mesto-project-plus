import { errorResponses } from '../utilits/constants';

class AccessError extends Error {
  statusCode: number;

  constructor(message: string | undefined) {
    super(message);
    this.statusCode = errorResponses.accessDeniedError.code;

    Object.setPrototypeOf(this, AccessError.prototype);
  }
}

export default AccessError;
