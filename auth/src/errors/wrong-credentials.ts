import BaseCustomError from './base-custom-error';
import { SerializedErrorOutput } from './types/serialized-error-output';

export default class WrongCredentials extends BaseCustomError {
  private statusCode = 401;

  private defaultErrorMessage = 'Wrong credentials provided';

  constructor() {
    super();

    Object.setPrototypeOf(this, WrongCredentials.prototype);
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
