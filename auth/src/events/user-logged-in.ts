import { BaseAuthEvent } from './base-auth-event';
import { UserDocument } from '../models/User';

export type UserLoggedInRestPayload = {
  status: string;
};

export default class UserLoggedIn extends BaseAuthEvent<UserLoggedInRestPayload> {
  private user: UserDocument;

  private statusCode = 200;

  constructor(user: UserDocument) {
    super();
    this.user = user;
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  serializeRest(): UserLoggedInRestPayload {
    return {
      status: 'Success'
    };
  }
}
