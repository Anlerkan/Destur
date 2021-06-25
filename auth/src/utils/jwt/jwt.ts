import { sign } from 'jsonwebtoken';
import { UserDocument } from '../../models';

export type CreateTokenArgs = {
  user: UserDocument;
};

export default class Jwt {
  static createToken(args: CreateTokenArgs): string {
    const { user } = args;

    const accessToken = sign({ id: user._id }, 'jwtSecret', { expiresIn: '2days' });

    return accessToken;
  }
}
