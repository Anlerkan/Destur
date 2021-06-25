import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import Unauthorized from '../errors/unauthorized';

export type ValidateTokenArgs = {
  req: Request;
  res: Response;
  next: NextFunction;
};

function validateToken(req: Request, res: Response, next: NextFunction): Response | void {
  const unAuthorizedError = new Unauthorized();

  if (req.cookies && req.cookies['access-token']) {
    try {
      const validToken = verify(req.cookies['access-token'], 'jwtSecret');

      if (validToken) {
        return next();
      }
    } catch (err) {
      return res
        .status(unAuthorizedError.getStatusCode())
        .send(unAuthorizedError.serializeErrorOutput());
    }
  }

  return res
    .status(unAuthorizedError.getStatusCode())
    .send(unAuthorizedError.serializeErrorOutput());
}

export default validateToken;
