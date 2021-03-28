import { BaseCustomError } from './base-custom-error';

export class InvalidInput extends BaseCustomError {
  statusCode = 422;

  serializedErrorOutput = undefined;

  constructor() {
    super('User input is not valid');

    Object.setPrototypeOf(this, InvalidInput.prototype);
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  serializeErrorOutput(): unknown {
    return this.serializedErrorOutput;
  }
}
