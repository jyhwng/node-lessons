import { Request, Response, NextFunction } from 'express';

export default async (req: Request, _: Response, next: NextFunction) => {
  const jwtManager = req.app.get('jwtManager');
  const token = req.headers.authorization?.split('Bearer ')[1];
  const { sub } = jwtManager.verify(token);
  jwtManager.invalidate(sub, token);
  next();
};
