import express, { Request, Response } from 'express';
import { validationResult, body } from 'express-validator';

import { LOGIN_ROUTE } from './route-defs';
import { User } from '../models';
import InvalidInput from '../errors/invalid-input';
import PasswordHash from '../utils/password-hash/password-hash';
import UserLoggedIn from '../events/user-logged-in';
import { Jwt } from '../utils/jwt';

const loginRouter = express.Router();

loginRouter.post(
  LOGIN_ROUTE,
  [
    body('email')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Email field may not be blank.'),
    body('password')
      .not()
      .isEmpty({ ignore_whitespace: true })
      .withMessage('Password field may not be blank.')
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req).array();

    const { email, password } = req.body;

    if (errors.length > 0) {
      throw new InvalidInput(errors);
    }

    const user = await User.findOne({ email });

    if (!user) {
      errors.push({
        location: 'body',
        value: email,
        param: 'password',
        msg: 'User was not found.'
      });

      throw new InvalidInput(errors);
    }

    const dbPassword = user.password;

    const isPasswordCorrect = PasswordHash.compareSync({
      providedPassword: password,
      storedPassword: dbPassword
    });

    if (!isPasswordCorrect) {
      errors.push({
        location: 'body',
        value: password,
        param: 'password',
        msg: 'Invalid password.'
      });

      throw new InvalidInput(errors);
    }

    const userLoggedInEvent = new UserLoggedIn(user);

    const accessToken = Jwt.createToken({ user });

    res.cookie('access-token', accessToken, { maxAge: 60 * 60 * 24 * 30 * 1000 });

    return res.status(userLoggedInEvent.getStatusCode()).send(userLoggedInEvent.serializeRest());
  }
);

export default loginRouter;
