import { errorResponses } from '../utilits/constants';

class ResourceError extends Error {
  statusCode: number;

  constructor(message: string | undefined) {
    super(message);
    this.statusCode = errorResponses.resourceNotFoundError.code;

    Object.setPrototypeOf(this, ResourceError.prototype);
  }
}

export default ResourceError;
