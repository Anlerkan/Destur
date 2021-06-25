import BaseCustomError from './base-custom-error';
import { SerializedErrorOutput } from './types/serialized-error-output';

export default class Unauthorized extends BaseCustomError {
  private statusCode = 401;

  private defaultErrorMessage = 'User is not authenticated.';

  constructor() {
    super();

    Object.setPrototypeOf(this, Unauthorized.prototype);
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  serializeErrorOutput(): SerializedErrorOutput {
    return {
      errors: [
        {
          message: this.defaultErrorMessage
        }
      ]
    };
  }
}
