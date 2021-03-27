import { Request, Response } from 'express';

// eslint-disable-next-line import/prefer-default-export
export const handleMethodNotAllowed = (req: Request, res: Response): Response =>
  res.sendStatus(405);
