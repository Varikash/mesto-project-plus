import { errorResponses } from '../utilits/constants';

class AuthError extends Error {
  statusCode: number;

  constructor(message: string | undefined) {
    super(message);
    this.statusCode = errorResponses.authenticationRequiredError.code;

    Object.setPrototypeOf(this, AuthError.prototype);
  }
}

export default AuthError;
